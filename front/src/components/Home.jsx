import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListAssets from './ListAssets';
import '../styles/home.css';

export default function Home() {
    return (
        <>
            <div id='nav-bar'>
                <nav>
                    <span className="brand-name">Wallet</span>
                    <ul>
                        <li><a href='/add-asset'>Adicionar asset</a></li>
                        <li><a href='/update-user'>Atualizar usuário</a></li>
                        <li><a href='/delete-user'>Excluir conta</a></li>
                    </ul>
                </nav>
            </div>

            <div id="content">
                <div className="account-summary">
                    <h2>RESUMO DA SUA CONTA</h2>
                    
                    <ListAssets />
                </div>
            </div>

            <footer id='footer'>
                <div className="footer-info">
                    <p>Augusto Juiz Ribeiro - 2023004523</p>
                    <p>Erick De Alvarenga Bonifacio - 2023005736</p>
                    <p>Daniel Pires Domingueti - 2023005164</p>
                    <p>Adriano Maretti - 2024001938</p>
                </div>
                <div id='git'>
                    <a href="https://github.com/Erick-Bonifacio/Final-Web-Project">GitHub</a>
                </div>
            </footer>
        </>
    );
}
