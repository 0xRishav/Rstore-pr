const fakeAuthAPI = (username, password, users) => {
  const user = users.find((user) => user.username === username);
  return (new Promise() = (resolve, reject) => {
    setTimeout(() => {
      if (username === user.username && password === user.password) {
        resolve({ success: true, status: 200 });
      }
      reject({ success: false, status: 401 });
    }, 3000);
  });
};
