import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PublicationContext } from "../context/PublicationContext";

export default function PublicationDetailPage() {
const { id } = useParams();
const navigate = useNavigate();
const { publications } = useContext(PublicationContext);

const publication = publications.find((p) => p.id === parseInt(id));

if (!publication) {
return <div className="p-10 text-center text-gray-500">Publikasi tidak ditemukan.</div>;
}

return (
<div className="max-w-5xl mx-auto py-12 px-6 sm:px-8">
    <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 text-center">
    {publication.title}
    </h1>

    <div className="flex flex-col lg:flex-row gap-8 mb-10">
    <img
        src={publication.coverUrl}
        alt={`Sampul ${publication.title}`}
        className="w-full sm:w-64 lg:w-72 h-auto object-cover rounded-lg shadow-md"
        onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/300x400/cccccc/ffffff?text=No+Image";
        }}
    />

    <div className="flex-1">
        <p className="text-sm text-gray-500 mb-3">
        <strong>Tanggal Rilis:</strong> {publication.releaseDate}
        </p>

        <div className="text-gray-700 leading-relaxed whitespace-pre-line text-justify text-sm sm:text-base">
        {publication.description || "Deskripsi belum tersedia."}
        </div>
    </div>
    </div>

    <div className="text-center">
    <button
        onClick={() => navigate("/publications")}
        className="inline-block bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg text-sm transition duration-200"
    >   
    </button>
    </div>
</div>
);
}
