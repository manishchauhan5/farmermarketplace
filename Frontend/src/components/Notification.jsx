import React, { useState } from "react";

const notificationsData = [
  {
    id: 1,
    title: "This is Dummy Notification, Work in progress...",
    description: "You have a new order for 10kg of Organic Apples.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "This is Dummy Notification, Work in progress...",
    description: "Order #1234 has been successfully delivered.",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: 3,
    title: "This is Dummy Notification, Work in progress...",
    description: "Get 20% off on all fertilizers this week!",
    timestamp: "3 days ago",
    read: false,
  },
  {
    id: 4,
    title: "This is Dummy Notification, Work in progress...",
    description: "You have received a 5-star review from John Doe.",
    timestamp: "5 days ago",
    read: false,
  },
];

const Notification = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="md:pt-[74px] min-h-screen bg-zinc-100">
      {/* Header */}
      <div className="bg-green-600 text-white md:py-4 w-full py-2 shadow-md md:relative fixed top-0 z-10">
        <h1 className="md:text-2xl text-lg font-semibold flex justify-center items-center">
          Notifications
        </h1>
      </div>

      {/* Notifications List */}
      <div className="md:px-10 px-2 md:py-6 py-12 md:space-y-4 space-y-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-md md:p-4 p-2 flex flex-col md:flex-row justify-between items-start transition-all duration-300 ${
                notification.read ? "opacity-75" : "hover:shadow-lg"
              }`}
            >
              <div className="flex-grow">
                <h2 className="md:text-lg text-md font-semibold text-red-500">
                  {notification.title}
                </h2>
                <p className="text-gray-700 mt-1 text-sm md:text-base">
                  {notification.description}
                </p>
                <span className="text-xs md:text-sm text-gray-500 mt-2 block">
                  {notification.timestamp}
                </span>
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                {/* Mark as Read Button */}
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="text-green-500 hover:text-green-700 font-medium text-sm md:text-base"
                  >
                    Mark as Read
                  </button>
                )}
                {/* Dismiss Button */}
                <button
                  onClick={() => handleDismiss(notification.id)}
                  className="text-red-500 hover:text-red-700 font-medium text-sm md:text-base"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No notifications available.</p>
        )}
      </div>

      {/* Load More Button (Optional) */}
      {notifications.length > 0 && (
        <div className="flex justify-center mt-4 pb-4">
          <button
            onClick={() => alert("Load more notifications...")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm md:text-base"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;