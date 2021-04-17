export default function fakeAuthAPI(email, password, users) {
  const user = users.find((user) => user.email === email);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === user.email && password === user.password) {
        resolve({ success: true, status: 200 });
      }
      reject({ success: false, status: 401 });
    }, 3000);
  });
}
