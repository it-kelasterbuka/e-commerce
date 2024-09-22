import { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

const useGetDataProduct = (collectionName) => {
  const [data, setData] = useState([]); // Menginisialisasi data sebagai array kosong
  const [loading, setLoading] = useState(true); // Menambahkan state untuk loading

  useEffect(() => {
    const getData = async () => {
      // Firestore realtime data update
      try {
        // Mendapatkan referensi ke koleksi berdasarkan nama koleksi
        const collectionRef = collection(db, collectionName);

        // Mendapatkan dokumen dari koleksi
        const querySnapshot = await onSnapshot(collectionRef, (snapshot) => {
          setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
      } catch (err) {
        setLoading(false);
      }
    };

    getData(); // Memanggil fungsi getData saat komponen pertama kali di-mount
  }, [collectionName]); // useEffect hanya akan dipanggil ulang jika collectionName berubah

  return { data, loading }; // Mengembalikan data, loading status, dan error
};

export default useGetDataProduct;
