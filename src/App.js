import axios from 'axios';
import React, { useState } from 'react';

function Home() {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(false)

  const getProdutos = async () => {
    setLoading(true)
    const response = await axios.get("https://leonardovieira.pythonanywhere.com/produtos/")
    setProdutos(response.data)
    setLoading(false)
  }

  const deleteProduto = async (produto_id) => {
    setLoading(true)
    await axios.delete(`https://leonardovieira.pythonanywhere.com/produtos/${produto_id}/`)
    await getProdutos()
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Loja</h1>
        <p className="mt-4 text-gray-700">Clique no botão para carregar produtos.</p>
      </header>
      <section className="mt-8">
        <button onClick={getProdutos} disabled={loading} className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          {loading ? "Carregando..." : "Carregar Produtos"}
        </button>
      </section>
      <div className="mt-10 flex justify-center">
          <table class="text-sm text-left text-gray-500">
            <thead className="text-xs text-white font-bold uppercase bg-blue-400">
              <tr>
                <th scope="col" className="px-12 py-3">ID</th>
                <th scope="col" className="px-12 py-3">Produto</th>
                <th scope="col" className="px-12 py-3">Unidades em Estoque</th>
                <th scope="col" className="px-12 py-3">Preço</th>
                <th scope="col" className="px-12 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {produtos.map((produto, index) => (
              <tr className="bg-white text-gray-700 border-b">
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.unidade}</td>
                <td>{produto.preco}</td>
                <td className="p-2">
                  <button onClick={() => deleteProduto(produto.id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Deletar
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default Home;
