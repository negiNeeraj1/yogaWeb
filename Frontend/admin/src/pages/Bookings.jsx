import React from 'react';

const Bookings = () => {
  const bookings = [
    { id: 1, name: 'John Doe', date: '2024-11-25', status: 'Confirmed' },
    { id: 2, name: 'Jane Smith', date: '2024-11-26', status: 'Pending' },
    { id: 3, name: 'Sam Wilson', date: '2024-11-27', status: 'Cancelled' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Bookings</h2>
      <div className="overflow-x-auto" style={{backgroundColor:"#f9fafb"}}>
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="text-center">
                <td className="px-4 py-2 border">{booking.id}</td>
                <td className="px-4 py-2 border">{booking.name}</td>
                <td className="px-4 py-2 border">{booking.date}</td>
                <td
                  className={`px-4 py-2 border ${
                    booking.status === 'Confirmed'
                      ? 'text-green-500'
                      : booking.status === 'Pending'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                  }`}
                >
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
