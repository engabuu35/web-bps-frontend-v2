import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PublicationContext } from "../context/PublicationContext";

export default function PublicationDetailPage() {
const { id } = useParams();
const navigate = useNavigate();
const { publications } = useContext(PublicationContext);

const publication = publications.find((p) => p.id === parseInt(id));

if (!publication) {
return (
    <div className="p-10 text-center text-gray-500">
    Publikasi tidak ditemukan.
    </div>
);
}

return (
<div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
    {publication.title}
    </h1>

    <div className="flex flex-col lg:flex-row items-start gap-10 mb-12 bg-white p-6 rounded-xl shadow-lg">
    <img
        src={publication.coverUrl}
        alt={`Sampul ${publication.title}`}
        className="w-full sm:w-80 lg:w-96 h-auto object-cover rounded-lg shadow-md flex-shrink-0"
        onError={(e) => {
        e.target.onerror = null;
        e.target.src =
            "https://placehold.co/300x400/cccccc/ffffff?text=No+Image";
        }}
    />

    <div className="flex-1 min-w-0">
        <p className="text-base text-gray-600 mb-4 border-b pb-3 border-gray-200">
        <strong className="font-semibold text-gray-800">
            Tanggal Rilis:
        </strong>{" "}
        {publication.releaseDate}
        </p>

        <div className="text-gray-800 leading-relaxed whitespace-pre-line text-justify text-base sm:text-lg">
        {publication.description || "Deskripsi belum tersedia."}
        </div>
    </div>
    </div>

    <div className="text-center">
    <button
        onClick={() => navigate("/publications")}
        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
    >
        ← Kembali ke Daftar Publikasi
    </button>
    </div>
</div>
);
}