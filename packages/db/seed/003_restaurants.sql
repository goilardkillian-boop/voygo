-- ============================================
-- VOYGO — Seed Data: Curated Restaurants
-- ============================================

INSERT INTO public.restaurants (destination, name, cuisine_type, price_range, rating, address, dietary_options, allergen_friendly, description) VALUES
-- PARIS
('Paris', 'Le Potager de Charlotte', 'french', 2, 4.5, '12 Rue de la Tour d''Auvergne, 75009', ARRAY['vegan','vegetarian','gluten_free'], ARRAY['gluten','dairy','eggs'], 'Restaurant 100% végétal avec options sans gluten. Cuisine créative et savoureuse.'),
('Paris', 'Le Bouillon Chartier', 'french', 1, 4.2, '7 Rue du Faubourg Montmartre, 75009', ARRAY['none'], ARRAY[]::TEXT[], 'Institution parisienne depuis 1896. Cuisine française traditionnelle à petits prix.'),
('Paris', 'Pink Mamma', 'italian', 2, 4.4, '20bis Rue de Douai, 75009', ARRAY['vegetarian'], ARRAY[]::TEXT[], 'Italien festif sur 4 étages. Pizzas excellentes, ambiance géniale.'),
('Paris', 'Le Petit Cler', 'french', 2, 4.6, '29 Rue Cler, 75007', ARRAY['none'], ARRAY[]::TEXT[], 'Bistrot de quartier authentique près de la Tour Eiffel. Produits frais et de saison.'),

-- LISBONNE
('Lisbonne', 'The Food Temple', 'mediterranean', 2, 4.5, 'Beco do Jasmim 18, 1100-289', ARRAY['vegetarian','vegan','gluten_free'], ARRAY['gluten','dairy'], 'Restaurant végétarien/végan dans l''Alfama. Menu qui change chaque jour.'),
('Lisbonne', 'Cervejaria Ramiro', 'local', 3, 4.6, 'Av. Almirante Reis 1-H, 1150-007', ARRAY['none'], ARRAY[]::TEXT[], 'Meilleurs fruits de mer de Lisbonne. Incontournable. Attention : pas idéal pour allergies crustacés.'),
('Lisbonne', 'Time Out Market', 'local', 2, 4.3, 'Av. 24 de Julho 49, 1200-479', ARRAY['vegetarian','vegan'], ARRAY[]::TEXT[], 'Food hall avec de nombreux stands. Quelque chose pour tout le monde.'),

-- BARCELONE
('Barcelone', 'Flax & Kale', 'mediterranean', 2, 4.4, 'Carrer dels Tallers, 74B, 08001', ARRAY['vegetarian','vegan','gluten_free'], ARRAY['gluten','dairy'], 'Flexitarien branché. 80% végétal, options sans gluten. Brunch excellent.'),
('Barcelone', 'La Boqueria - Bar Pinotxo', 'local', 2, 4.5, 'Mercat de la Boqueria, 08001', ARRAY['none'], ARRAY[]::TEXT[], 'Comptoir mythique dans le marché de la Boqueria. Tapas fraîches et authentiques.'),
('Barcelone', 'Can Culleretes', 'local', 2, 4.3, 'Carrer d''en Quintana, 5, 08002', ARRAY['none'], ARRAY[]::TEXT[], 'Plus vieux restaurant de Barcelone (1786). Cuisine catalane traditionnelle.'),

-- ROME
('Rome', 'Roscioli', 'italian', 3, 4.7, 'Via dei Giubbonari, 21, 00186', ARRAY['none'], ARRAY[]::TEXT[], 'Épicerie fine et restaurant. Pâtes et charcuteries exceptionnelles.'),
('Rome', 'Ops!', 'italian', 2, 4.3, 'Via Bergamo, 56, 00198', ARRAY['vegan','vegetarian','gluten_free'], ARRAY['gluten','dairy','eggs'], 'Buffet végétalien à volonté. Bio, frais et abordable.'),
('Rome', 'Tonnarello', 'italian', 2, 4.4, 'Via della Paglia, 40, 00153', ARRAY['vegetarian'], ARRAY[]::TEXT[], 'Trastevere. Pâtes maison légendaires, cacio e pepe incontournable.'),

-- TOKYO
('Tokyo', 'Ichiran Ramen', 'japanese', 1, 4.5, 'Shibuya, Tokyo', ARRAY['none'], ARRAY[]::TEXT[], 'Ramen tonkotsu dans des box individuels. Expérience unique. Personnalisation totale.'),
('Tokyo', 'Afuri', 'japanese', 2, 4.4, 'Roppongi, Tokyo', ARRAY['none'], ARRAY[]::TEXT[], 'Ramen yuzu shio léger et raffiné. Options végétariennes disponibles.'),
('Tokyo', 'T''s TanTan', 'japanese', 1, 4.3, 'Tokyo Station, Tokyo', ARRAY['vegan','vegetarian'], ARRAY['dairy','eggs'], 'Ramen végan en gare de Tokyo. Parfait entre deux trains.'),

-- MARRAKECH
('Marrakech', 'Nomad', 'middle_eastern', 2, 4.5, '1 Derb Aarjane, 40000', ARRAY['none'], ARRAY[]::TEXT[], 'Cuisine marocaine moderne avec vue sur les souks. Terrasse superbe.'),
('Marrakech', 'Earth Café', 'mediterranean', 1, 4.3, '2 Derb El Ferrane, 40000', ARRAY['vegan','vegetarian','gluten_free'], ARRAY['gluten','dairy'], 'Café végan dans la médina. Smoothie bowls, salades, wraps.'),

-- BANGKOK
('Bangkok', 'Jay Fai', 'thai', 3, 4.7, '327 Maha Chai Rd, 10200', ARRAY['none'], ARRAY['shellfish'], 'Street food étoilée Michelin. Omelette au crabe légendaire. Longue attente.'),
('Bangkok', 'May Veggie Home', 'thai', 1, 4.4, '55/1 Tanao Rd, 10200', ARRAY['vegan','vegetarian'], ARRAY['dairy','eggs'], 'Thai végétarien authentique et pas cher. Près de Khao San Road.');
