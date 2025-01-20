import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { collection, getDocs } from "firebase/firestore"; // No 'where' query here
import { Card, Spinner } from "flowbite-react";
import { db } from "../firebase/firebase";
import SearchResultCard from "./SearchResultCard";

export default function SeachResult({ searched }) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searched.trim()) {
      setResult([]);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const itemsRef = collection(db, "items");
        const querySnapshot = await getDocs(itemsRef); // Fetch all documents

        // Perform client-side filtering for partial match
        const items = querySnapshot.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((item) =>
            item.Name.toLowerCase().includes(searched.trim().toLowerCase()) // Partial match
          );

        setResult(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searched]);

  const portalElement = document.getElementById("portal");
  if (!portalElement || searched === "") {
   // console.error("Portal element not found in the DOM.");
    return null;
  }

  return ReactDOM.createPortal(
    <div>
      {loading && (
        <div className="absolute top-[15%] right-1 -translate-y-1/2">
            <Card className="max-w-sm">
                <div>
                    <Spinner /> <span>Loading...</span>
                </div>
            </Card>
        </div>
      )}
      {!loading && error && (
        <div className="absolute top-[14.8%] right-1 -translate-y-1/2">
            <Card className="max-w-sm">
                <div>
                <p>Error: {error}</p>
                </div>
            </Card>
        </div>
      )}
      {!loading && result.length === 0 && !error && (
        <div className="absolute top-[10%] right-1">
            <Card className="max-w-sm">
                <div>
                    <p>No results found.</p>
                </div>
            </Card>
        </div>
      )}
      {!loading && result.length > 0 && !error && (
        <div className="absolute top-[10%] right-1 h-[40rem] overflow-y-auto">
            {console.log(result[0].id)}
            <Card className="w-fit">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Results:
            </h5>
            <div className="grid md:grid-cols-3 gap-4">
                {result.map((item) => (
                    <SearchResultCard item={item} />
                ))}
            </div>
            </Card>
        </div>
      )}
    </div>,
    portalElement
  );
}
