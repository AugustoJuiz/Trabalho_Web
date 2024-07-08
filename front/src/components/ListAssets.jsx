import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ListAssetsStyle.css';

export default function ListAssets() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      const idUser = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      if (!idUser || !token) {
        setError("Usuário não autenticado");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/usersroute/list-assets/${idUser}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

                if (response.status === 200) {
                    if (response.data.length > 0) {
                        setAssets(response.data);
                    } else {
                        setError('Você não possui assets.');
                    }
                } else {
                    setError('Erro ao buscar assets');
                }
            } catch (error) {
                console.error('Erro ao buscar assets:', error);
                setError(error.response ? error.response.data : 'Erro ao buscar assets');
            } finally {
                setLoading(false);
            }
        };

    fetchAssets();
  }, []);

    const handleUpdate = (asset) => {
        navigate('/update-asset', { state: { asset } });
    };

    const handleDelete = async (asset) => {
        if (!window.confirm('Você tem certeza que deseja deletar este asset?')) {
            return;
        }

        const token = localStorage.getItem('token');
        const idUser = localStorage.getItem('id');

        if (!token || !idUser) {
            setError('Usuário não autenticado');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8080/usersroute/delete-asset`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    idUser,
                    sigla: asset.sigla
                }
            });

            if (response.status === 200) {
                setAssets(assets.filter(a => a.sigla !== asset.sigla));
            } else {
                setError('Erro ao deletar asset');
            }
        } catch (error) {
            console.error('Erro ao deletar asset:', error);
            setError(error.response ? error.response.data : 'Erro ao deletar asset');
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
      <>
        <div className="assets-list">
            {assets.length > 0 ? (
                <ol className="assets-list">
                    {assets.map((asset, index) => (
                        <li key={index} className="asset-item">
                            <div><strong>Data:</strong> {asset.data}</div>
                            <div><strong>Sigla:</strong> {asset.sigla}</div>
                            <div><strong>Setor:</strong> {asset.setor}</div>
                            <div><strong>Preço:</strong> {asset.preco}</div>
                            <div><strong>Cotas:</strong> {asset.cotas}</div>
                            <div className="asset-actions">
                                <button onClick={() => handleUpdate(asset)}>Atualizar</button>
                                <button className="delete-btn" onClick={() => handleDelete(asset)}>Deletar</button>
                            </div>
                        </li>
                    ))}
                </ol>
            ) : (
                <p>Você não possui assets.</p>
            )}
        </div>

        <div className="total-invested">
          <p>
            <strong>TOTAL INVESTIDO</strong>: R${" "}
            {assets
              .reduce((total, asset) => total + asset.cotas * asset.preco, 0)
              .toFixed(2).replace('.', ',')}
          </p>
        </div>
      </>

        
    );
}
