import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PublicationContext } from "../context/PublicationContext";
import { CalendarDaysIcon } from "@heroicons/react/24/outline"; // Gunakan heroicons jika tersedia

export default function PublicationDetailPage() {
const { id } = useParams();
const { publications } = useContext(PublicationContext);

const publication = publications.find((p) => p.id === parseInt(id));

if (!publication) {
    return <div className="p-10 text-center text-gray-500">Publikasi tidak ditemukan.</div>;
}

return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 text-center">
        {publication.title}
    </h1>

    <div className="flex flex-col lg:flex-row gap-8 items-start">
        <img
        src={publication.coverUrl}
        alt={`Sampul ${publication.title}`}
        className="w-full sm:w-64 lg:w-72 h-auto object-cover rounded-xl shadow-lg"
        onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/300x400/cccccc/ffffff?text=Sampul+tidak+tersedia";
        }}
        />

        <div className="flex-1">
        <div className="flex items-center text-gray-600 mb-4">
            <CalendarDaysIcon className="h-5 w-5 mr-2 text-slate-500" />
            <span className="text-sm">Tanggal Rilis: {publication.releaseDate}</span>
        </div>

        <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-line text-sm sm:text-base">
            {publication.description || "Deskripsi belum tersedia."}
        </p>
        </div>
    </div>
    </div>
);
}
