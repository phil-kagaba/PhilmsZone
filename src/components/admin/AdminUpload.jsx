

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminUpload = () => {
  const [video, setVideo] = useState(null);
  const [snapshot, setSnapshot] = useState(null);
  const [formData, setFormData] = useState({
    file_title: '',
    file_descr: '',
    fld_id: '',
    cat_id: '',
    tags: '',
    file_public: '1',
    file_adult: '0',
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderParentId, setNewFolderParentId] = useState('');
  const [folderMsg, setFolderMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video) {
      alert('Please select a video file.');
      return;
    }

    const data = new FormData();
    data.append('video', video);
    if (snapshot) data.append('snapshot', snapshot);
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/upload', data);
      setResponse(res.data);
    } catch (err) {
      setResponse({ error: err.message });
    }
    setLoading(false);
  };

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    setFolderMsg('Creating folder...');

    try {
      const url = `https://streamhgapi.com/api/folder/create?key=28808i3qemps5djx0krzg&name=${encodeURIComponent(newFolderName)}&parent_id=${newFolderParentId}`;
      const res = await axios.get(url);

      if (res.data.status === 200) {
        setFolderMsg(`✅ Folder "${newFolderName}" created successfully.`);
      } else {
        setFolderMsg(`❌ Error: ${res.data.message}`);
      }
    } catch (error) {
      setFolderMsg(`❌ Failed to create folder: ${error.message}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100 font-sans">
  {/* Sidebar */}
  <aside className="w-64 bg-gray-900 px-6 py-8 space-y-6 border-r border-gray-700">
    <h1 className="text-2xl font-extrabold tracking-wide text-blue-400">Admin Panel</h1>
    <nav className="space-y-2">
      {[
        { path: "/dashboard", label: "Dashboard" },
        { path: "/upload", label: "Upload" },
        { path: "/movies", label: "movies" },
        { path: "/reports", label: "Reports" },
        { path: "/Messages", label: "Messages" },
        { path: "/comments", label: "Comments" },
        { path: "/delete", label: "Delete" },
        { path: "/update", label: "Update" },
      ].map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className="block px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
        >
          {label}
        </Link>
      ))}
    </nav>
  </aside>

  {/* Main Content */}
  <main className="flex-1 p-8 overflow-y-auto">
    <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg space-y-8">
      {/* Create Folder */}
      <section>
        <h2 className="text-xl font-bold text-blue-300 mb-4">📁 Create New Folder</h2>
        <form onSubmit={handleCreateFolder} className="space-y-4">
          <input
            type="text"
            placeholder="Folder Name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Parent Folder ID (optional)"
            value={newFolderParentId}
            onChange={(e) => setNewFolderParentId(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring focus:ring-blue-500"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Create Folder
          </button>
          {folderMsg && <p className="text-sm text-blue-400 mt-2">{folderMsg}</p>}
        </form>
      </section>

      {/* Upload Video */}
      <section>
        <h2 className="text-2xl font-bold text-blue-300 mb-6">🎬 Upload Video</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          {/* Media Inputs */}
          <label className="block">
            <span className="font-semibold">Video File</span>
            <input type="file" onChange={(e) => setVideo(e.target.files[0])} accept="video/*" className="w-full mt-2 p-2 bg-gray-800 border border-gray-600 rounded" required />
          </label>
          <label className="block">
            <span className="font-semibold">Thumbnail Image</span>
            <input type="file" onChange={(e) => setSnapshot(e.target.files[0])} accept="image/*" className="w-full mt-2 p-2 bg-gray-800 border border-gray-600 rounded" />
          </label>

          {/* Preview */}
          {snapshot && (
            <img
              src={URL.createObjectURL(snapshot)}
              alt="Snapshot Preview"
              className="w-full max-h-48 object-contain border mt-2 rounded"
            />
          )}

          {/* Metadata Inputs */}
          {[
            { name: "file_title", placeholder: "Video Title", required: true },
            { name: "file_descr", placeholder: "Description" },
            { name: "fld_id", placeholder: "Folder ID (optional)" },
            { name: "cat_id", placeholder: "Category ID (optional)" },
            { name: "tags", placeholder: "Tags (comma separated)" },
          ].map(({ name, placeholder, required }) => (
            <input
              key={name}
              type="text"
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              required={required}
              className="w-full p-3 border border-gray-600 rounded bg-gray-800 focus:ring focus:ring-blue-500"
            />
          ))}

          {/* Select Options */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Public</label>
              <select name="file_public" onChange={handleChange} className="w-full p-2 border border-gray-600 rounded bg-gray-800">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Adult</label>
              <select name="file_adult" onChange={handleChange} className="w-full p-2 border border-gray-600 rounded bg-gray-800">
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>

          {/* Upload Button */}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {/* Server Response */}
        {response && (
          <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded">
            <pre className="text-sm whitespace-pre-wrap break-words text-green-300">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </section>
    </div>

    {/* Footer */}
    <footer className="mt-10 text-center text-gray-500 text-xs">Server ID: 2121</footer>
  </main>
</div>

  );
};

export default AdminUpload;









// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const AdminUpload = () => {
//   const [video, setVideo] = useState(null);
//   const [snapshot, setSnapshot] = useState(null);
//   const [formData, setFormData] = useState({
//     file_title: '',
//     file_descr: '',
//     fld_id: '',
//     cat_id: '',
//     tags: '',
//     file_public: '1',
//     file_adult: '0',
//   });
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [newFolderName, setNewFolderName] = useState('');
//   const [newFolderParentId, setNewFolderParentId] = useState('');
//   const [folderMsg, setFolderMsg] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!video) {
//       alert('Please select a video file.');
//       return;
//     }

//     const data = new FormData();
//     data.append('video', video);
//     if (snapshot) data.append('snapshot', snapshot);
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value) data.append(key, value);
//     });

//     setLoading(true);
//     try {
//       const res = await axios.post('http://localhost:4000/upload', data);
//       setResponse(res.data);
//     } catch (err) {
//       setResponse({ error: err.message });
//     }
//     setLoading(false);
//   };

//   const handleCreateFolder = async (e) => {
//     e.preventDefault();
//     setFolderMsg('Creating folder...');

//     try {
//       const url = `https://streamhgapi.com/api/folder/create?key=28808i3qemps5djx0krzg&name=${encodeURIComponent(newFolderName)}&parent_id=${newFolderParentId}`;
//       const res = await axios.get(url);

//       if (res.data.status === 200) {
//         setFolderMsg(`✅ Folder "${newFolderName}" created successfully.`);
//       } else {
//         setFolderMsg(`❌ Error: ${res.data.message}`);
//       }
//     } catch (error) {
//       setFolderMsg(`❌ Failed to create folder: ${error.message}`);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-950 text-gray-100 font-sans">
//   {/* Sidebar */}
//   <aside className="w-64 bg-gray-900 px-6 py-8 space-y-6 border-r border-gray-700">
//     <h1 className="text-2xl font-extrabold tracking-wide text-blue-400">Admin Panel</h1>
//     <nav className="space-y-2">
//       {[
//         { path: "/dashboard", label: "Dashboard" },
//         { path: "/upload", label: "Upload" },
//         { path: "/movies", label: "movies" },
//         { path: "/reports", label: "Reports" },
//         { path: "/Messages", label: "Messages" },
//         { path: "/comments", label: "Comments" },
//         { path: "/delete", label: "Delete" },
//         { path: "/update", label: "Update" },
//       ].map(({ path, label }) => (
//         <Link
//           key={path}
//           to={path}
//           className="block px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
//         >
//           {label}
//         </Link>
//       ))}
//     </nav>
//   </aside>

//   {/* Main Content */}
//   <main className="flex-1 p-8 overflow-y-auto">
//     <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg space-y-8">
//       {/* Create Folder */}
//       <section>
//         <h2 className="text-xl font-bold text-blue-300 mb-4">📁 Create New Folder</h2>
//         <form onSubmit={handleCreateFolder} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Folder Name"
//             value={newFolderName}
//             onChange={(e) => setNewFolderName(e.target.value)}
//             className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring focus:ring-blue-500"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Parent Folder ID (optional)"
//             value={newFolderParentId}
//             onChange={(e) => setNewFolderParentId(e.target.value)}
//             className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring focus:ring-blue-500"
//           />
//           <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
//             Create Folder
//           </button>
//           {folderMsg && <p className="text-sm text-blue-400 mt-2">{folderMsg}</p>}
//         </form>
//       </section>

//       {/* Upload Video */}
//       <section>
//         <h2 className="text-2xl font-bold text-blue-300 mb-6">🎬 Upload Video</h2>
//         <form onSubmit={handleUpload} className="space-y-4">
//           {/* Media Inputs */}
//           <label className="block">
//             <span className="font-semibold">Video File</span>
//             <input type="file" onChange={(e) => setVideo(e.target.files[0])} accept="video/*" className="w-full mt-2 p-2 bg-gray-800 border border-gray-600 rounded" required />
//           </label>
//           <label className="block">
//             <span className="font-semibold">Thumbnail Image</span>
//             <input type="file" onChange={(e) => setSnapshot(e.target.files[0])} accept="image/*" className="w-full mt-2 p-2 bg-gray-800 border border-gray-600 rounded" />
//           </label>

//           {/* Preview */}
//           {snapshot && (
//             <img
//               src={URL.createObjectURL(snapshot)}
//               alt="Snapshot Preview"
//               className="w-full max-h-48 object-contain border mt-2 rounded"
//             />
//           )}

//           {/* Metadata Inputs */}
//           {[
//             { name: "file_title", placeholder: "Video Title", required: true },
//             { name: "file_descr", placeholder: "Description" },
//             { name: "fld_id", placeholder: "Folder ID (optional)" },
//             { name: "cat_id", placeholder: "Category ID (optional)" },
//             { name: "tags", placeholder: "Tags (comma separated)" },
//           ].map(({ name, placeholder, required }) => (
//             <input
//               key={name}
//               type="text"
//               name={name}
//               placeholder={placeholder}
//               onChange={handleChange}
//               required={required}
//               className="w-full p-3 border border-gray-600 rounded bg-gray-800 focus:ring focus:ring-blue-500"
//             />
//           ))}

//           {/* Select Options */}
//           <div className="flex gap-4">
//             <div className="flex-1">
//               <label className="block mb-1 font-semibold">Public</label>
//               <select name="file_public" onChange={handleChange} className="w-full p-2 border border-gray-600 rounded bg-gray-800">
//                 <option value="1">Yes</option>
//                 <option value="0">No</option>
//               </select>
//             </div>
//             <div className="flex-1">
//               <label className="block mb-1 font-semibold">Adult</label>
//               <select name="file_adult" onChange={handleChange} className="w-full p-2 border border-gray-600 rounded bg-gray-800">
//                 <option value="0">No</option>
//                 <option value="1">Yes</option>
//               </select>
//             </div>
//           </div>

//           {/* Upload Button */}
//           <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
//             {loading ? 'Uploading...' : 'Upload'}
//           </button>
//         </form>

//         {/* Server Response */}
//         {response && (
//           <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded">
//             <pre className="text-sm whitespace-pre-wrap break-words text-green-300">{JSON.stringify(response, null, 2)}</pre>
//           </div>
//         )}
//       </section>
//     </div>

//     {/* Footer */}
//     <footer className="mt-10 text-center text-gray-500 text-xs">Server ID: 2121</footer>
//   </main>
// </div>

//   );
// };

// export default AdminUpload;
