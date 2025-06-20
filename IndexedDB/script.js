function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("UserDatabase", 1);

    request.onerror = () => reject("Error opening database");
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
      }
    };
  });
}

async function addUser(user) {
  const db = await openDB();
  const tx = db.transaction("users", "readwrite");
  const store = tx.objectStore("users");
  store.add(user);
  return tx.complete;
}

async function getAllUsers() {
  const db = await openDB();
  const tx = db.transaction("users", "readonly");
  const store = tx.objectStore("users");

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error fetching users");
  });
}

async function updateUser(user) {
  const db = await openDB();
  const tx = db.transaction("users", "readwrite");
  const store = tx.objectStore("users");
  store.put(user); // must contain the same `id` field
  return tx.complete;
}

async function deleteUser(id) {
  const db = await openDB();
  const tx = db.transaction("users", "readwrite");
  const store = tx.objectStore("users");
  store.delete(id);
  return tx.complete;
}

// Example usage
async function addTestUsers() {
  await addUser({ name: "Alice", age: 25 });
  await addUser({ name: "Bob", age: 30 });
  document.getElementById("output").textContent =
    "Added test users: Alice & Bob.";
}

async function readUsers() {
  const users = await getAllUsers();
  document.getElementById("output").textContent =
    "All users:\n" + JSON.stringify(users, null, 2);
}

async function updateUserRecord() {
  const updated = { id: 1, name: "Alice Smith", age: 26 };
  await updateUser(updated);
  document.getElementById("output").textContent =
    "User 1 updated to:\n" + JSON.stringify(updated, null, 2);
}

async function deleteUserRecord() {
  await deleteUser(2);
  document.getElementById("output").textContent = "User 2 deleted.";
}
