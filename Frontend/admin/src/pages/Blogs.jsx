import React from 'react';

const Blogs = () => {
  const blogs = [
    { id: 1, title: 'The Benefits of Yoga', views: 1234, date: '2024-11-01' },
    { id: 2, title: 'How to Start Yoga at Home', views: 987, date: '2024-11-10' },
    { id: 3, title: 'Advanced Yoga Techniques', views: 456, date: '2024-11-20' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Views</th>
              <th className="px-4 py-2 border">Published Date</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="text-center">
                <td className="px-4 py-2 border">{blog.id}</td>
                <td className="px-4 py-2 border">{blog.title}</td>
                <td className="px-4 py-2 border">{blog.views}</td>
                <td className="px-4 py-2 border">{blog.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blogs;
