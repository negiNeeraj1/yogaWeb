import React from 'react';

const Clients = () => {
  const clients = [
    { id: 1, name: 'John Doe', email: 'john@example.com', sessions: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', sessions: 8 },
    { id: 3, name: 'Sam Wilson', email: 'sam@example.com', sessions: 3 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Clients</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Sessions Attended</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="text-center">
                <td className="px-4 py-2 border">{client.id}</td>
                <td className="px-4 py-2 border">{client.name}</td>
                <td className="px-4 py-2 border">{client.email}</td>
                <td className="px-4 py-2 border">{client.sessions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
