import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Phone, Mail, Calendar, CreditCard } from "lucide-react";

export default async function ClientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      reservations: {
        include: { treatment: true },
        orderBy: { date: 'desc' }
      },
      factures: true
    }
  });

  if (!client) {
    notFound();
  }

  const nbSoins = client.reservations.length;
  const totalSpent = client.factures.reduce((sum, f) => sum + f.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/clients" className="p-2 border border-stone-200 bg-white text-stone-500 hover:text-stone-800 transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>
            {client.firstName} {client.lastName}
          </h1>
          <p className="text-sm text-stone-500">Dossier patient</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-stone-100 p-5">
            <h2 className="text-xs uppercase tracking-widest text-stone-400 font-medium mb-4">Informations</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-stone-700">
                <Mail size={16} className="text-stone-400" /> {client.email || "-"}
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-700">
                <Phone size={16} className="text-stone-400" /> {client.phone || "-"}
              </div>
            </div>
            
            <hr className="my-5 border-stone-100" />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Soins</p>
                <p className="text-xl font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>{nbSoins}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Dépenses</p>
                <p className="text-xl font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>{totalSpent.toLocaleString("fr-FR")} DH</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-stone-100">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-widest text-stone-400 font-medium">Historique des soins</h2>
            </div>
            <div className="p-0">
              {client.reservations.length === 0 ? (
                <div className="p-8 text-center text-stone-400 text-sm">Aucun historique de soins.</div>
              ) : (
                <table className="w-full text-sm">
                  <tbody>
                    {client.reservations.map((res: any, i: number) => (
                      <tr key={res.id} className="border-b border-stone-50 hover:bg-[#faf8f5] transition-colors">
                        <td className="px-5 py-3.5 text-stone-500 whitespace-nowrap">
                          {new Date(res.date).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-5 py-3.5 font-medium text-stone-800">
                          {res.treatment?.name || "-"}
                        </td>
                        <td className="px-5 py-3.5 text-stone-500 text-right">
                          {res.treatment?.price} DH
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
