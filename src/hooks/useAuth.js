import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Ambil data pengguna dari Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;

        setCurrentUser({ ...user, role: userData?.role });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen unmount
  }, []);

  return { currentUser, loading };
};

export default useAuth;

// import { useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase.config";

// const useAuth = () => {
//   const [currentUser, setCurrentUser] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//       } else {
//         setCurrentUser(null);
//       }
//     });
//   });

//   return {
//     currentUser,
//   };
// };

// export default useAuth;
