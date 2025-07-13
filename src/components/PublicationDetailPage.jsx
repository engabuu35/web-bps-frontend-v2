import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PublicationContext } from "../context/PublicationContext";

export default function PublicationDetailPage() {
const { id } = useParams();
const { publications } = useContext(PublicationContext);

const publication = publications.find((p) => p.id === parseInt(id)); // ✅ Perbaikan di sini

if (!publication) {
return <div className="p-10 text-center text-gray-500">Publikasi tidak ditemukan.</div>;
}

return (
<div className="max-w-4xl mx-auto py-10 px-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">{publication.title}</h1>
    <p className="text-gray-500 mb-2">Tanggal Rilis: {publication.releaseDate}</p>
    <img
    src={publication.coverUrl}
    alt={`Sampul ${publication.title}`}
    className="w-64 h-auto object-cover rounded shadow mb-6"
    />
    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
    {publication.description || "Deskripsi belum tersedia."}
    </p>
</div>
);
}
