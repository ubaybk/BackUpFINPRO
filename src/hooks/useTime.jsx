const useTime = () => {
    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now - date;
    
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
        if (diffInMinutes < 1) {
          return "Baru saja";
        } else if (diffInMinutes < 60) {
          return `${diffInMinutes} menit yang lalu`;
        } else if (diffInHours < 24) {
          return `${diffInHours} jam yang lalu`;
        } else {
          return `${diffInDays} hari yang lalu`;
        }
      };

    return timeAgo
}

export default useTime