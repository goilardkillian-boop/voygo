-- ============================================
-- VOYGO — Seed Data: Destinations
-- ============================================

INSERT INTO public.destinations (name, country, country_code, currency, language, timezone, plug_type, visa_info, emergency_number, useful_info, lat, lng) VALUES
('Paris', 'France', 'FR', 'EUR', 'Français', 'Europe/Paris', 'Type C/E', 'Schengen — pas de visa pour les citoyens UE', '112', 'Pourboire non obligatoire mais apprécié (5-10%). Métro très pratique. Musées gratuits le 1er dimanche du mois.', 48.8566, 2.3522),
('Lisbonne', 'Portugal', 'PT', 'EUR', 'Portugais', 'Europe/Lisbon', 'Type C/F', 'Schengen — pas de visa pour les citoyens UE', '112', 'Très vallonné, prévoir des chaussures confortables. Le tram 28 est incontournable. Pastéis de nata obligatoires.', 38.7223, -9.1393),
('Barcelone', 'Espagne', 'ES', 'EUR', 'Espagnol / Catalan', 'Europe/Madrid', 'Type C/F', 'Schengen — pas de visa pour les citoyens UE', '112', 'Attention aux pickpockets sur les Ramblas. Réserver la Sagrada Familia à l''avance. Dîner tard (21h+).', 41.3874, 2.1686),
('Rome', 'Italie', 'IT', 'EUR', 'Italien', 'Europe/Rome', 'Type C/F/L', 'Schengen — pas de visa pour les citoyens UE', '112', 'Fontaine de Trevi souvent bondée le matin. Attention aux restos touristiques. Boire l''eau des fontaines publiques.', 41.9028, 12.4964),
('Amsterdam', 'Pays-Bas', 'NL', 'EUR', 'Néerlandais', 'Europe/Amsterdam', 'Type C/F', 'Schengen — pas de visa pour les citoyens UE', '112', 'Tout le monde parle anglais. Vélo indispensable. Réserver les musées en ligne.', 52.3676, 4.9041),
('Londres', 'Royaume-Uni', 'GB', 'GBP', 'Anglais', 'Europe/London', 'Type G', 'Passeport requis pour les citoyens UE depuis le Brexit', '999', 'Oyster Card ou contactless pour les transports. Nombreux musées gratuits. Conduite à gauche.', 51.5074, -0.1278),
('Tokyo', 'Japon', 'JP', 'JPY', 'Japonais', 'Asia/Tokyo', 'Type A/B', 'Visa touriste 90 jours gratuit pour les citoyens UE', '110', 'Le cash reste très utilisé. Suica/Pasmo card pour les transports. Respecter les files d''attente.', 35.6762, 139.6503),
('New York', 'États-Unis', 'US', 'USD', 'Anglais', 'America/New_York', 'Type A/B', 'ESTA obligatoire pour les citoyens UE', '911', 'Pourboire obligatoire (18-20%). MetroCard pour le subway. Réserver les restos populaires.', 40.7128, -74.0060),
('Marrakech', 'Maroc', 'MA', 'MAD', 'Arabe / Français', 'Africa/Casablanca', 'Type C/E', 'Pas de visa requis pour les citoyens UE (90 jours)', '15', 'Négocier dans les souks. Boire de l''eau en bouteille. Respecter le ramadan si applicable.', 31.6295, -7.9811),
('Bangkok', 'Thaïlande', 'TH', 'THB', 'Thaï', 'Asia/Bangkok', 'Type A/B/C', 'Exemption de visa 30 jours pour les citoyens UE', '191', 'BTS Skytrain et bateaux pour éviter le trafic. Street food excellente et pas chère. Respecter les temples.', 13.7563, 100.5018),
('Istanbul', 'Turquie', 'TR', 'TRY', 'Turc', 'Europe/Istanbul', 'Type C/F', 'E-visa requis pour certains pays UE', '112', 'Istanbulkart pour les transports. Négocier au Grand Bazar. Manger des kebabs loin des zones touristiques.', 41.0082, 28.9784),
('Dubrovnik', 'Croatie', 'HR', 'EUR', 'Croate', 'Europe/Zagreb', 'Type C/F', 'Schengen — pas de visa pour les citoyens UE', '112', 'Visiter tôt le matin pour éviter les foules. Baignade dans l''Adriatique superbe. Game of Thrones tours disponibles.', 42.6507, 18.0944);
