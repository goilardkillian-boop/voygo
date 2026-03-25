-- ============================================
-- VOYGO — Seed Data: Useful Phrases
-- ============================================

-- PORTUGUESE (Lisbonne)
INSERT INTO public.useful_phrases (language, category, original, translated, phonetic, sort_order) VALUES
('pt', 'greeting', 'Bonjour', 'Bom dia', 'Bom dia', 1),
('pt', 'greeting', 'Bonsoir', 'Boa noite', 'Boa noïtch', 2),
('pt', 'greeting', 'Merci', 'Obrigado / Obrigada', 'Obrigadou / Obrigada', 3),
('pt', 'greeting', 'S''il vous plaît', 'Por favor', 'Por favor', 4),
('pt', 'greeting', 'Excusez-moi', 'Com licença', 'Com licénsa', 5),
('pt', 'restaurant', 'L''addition, s''il vous plaît', 'A conta, por favor', 'A conta, por favor', 1),
('pt', 'restaurant', 'Je suis allergique à...', 'Sou alérgico/a a...', 'So alérgico/a a...', 2),
('pt', 'restaurant', 'Un plat végétarien, s''il vous plaît', 'Um prato vegetariano, por favor', 'Oum prato vegetariano, por favor', 3),
('pt', 'restaurant', 'De l''eau, s''il vous plaît', 'Água, por favor', 'Agoua, por favor', 4),
('pt', 'transport', 'Où est la station de métro ?', 'Onde é a estação de metro?', 'Ondé é a estasão dé métro?', 1),
('pt', 'transport', 'Un billet pour...', 'Um bilhete para...', 'Oum bilyéte para...', 2),
('pt', 'emergency', 'J''ai besoin d''aide', 'Preciso de ajuda', 'Précizo dé ajouda', 1),
('pt', 'emergency', 'Appelez une ambulance', 'Chame uma ambulância', 'Chamé ouma ambulância', 2),
('pt', 'emergency', 'Où est l''hôpital ?', 'Onde é o hospital?', 'Ondé é o ospital?', 3),

-- SPANISH (Barcelone)
('es', 'greeting', 'Bonjour', 'Hola / Buenos días', 'Ola / Bouénos dias', 1),
('es', 'greeting', 'Merci', 'Gracias', 'Grassias', 2),
('es', 'greeting', 'S''il vous plaît', 'Por favor', 'Por favor', 3),
('es', 'greeting', 'Excusez-moi', 'Disculpe', 'Discoulpé', 4),
('es', 'restaurant', 'L''addition, s''il vous plaît', 'La cuenta, por favor', 'La couenta, por favor', 1),
('es', 'restaurant', 'Je suis allergique à...', 'Soy alérgico/a a...', 'Soï alérgico/a a...', 2),
('es', 'restaurant', 'Un plat végétarien', 'Un plato vegetariano', 'Oun plato végétariano', 3),
('es', 'transport', 'Où est la station de métro ?', '¿Dónde está la estación de metro?', 'Dondé está la estassion dé métro?', 1),
('es', 'emergency', 'J''ai besoin d''aide', 'Necesito ayuda', 'Nésessito ayouda', 1),
('es', 'emergency', 'Appelez une ambulance', 'Llame a una ambulancia', 'Yamé a ouna ambulansia', 2),

-- ITALIAN (Rome)
('it', 'greeting', 'Bonjour', 'Buongiorno', 'Bouondjorno', 1),
('it', 'greeting', 'Merci', 'Grazie', 'Grattsié', 2),
('it', 'greeting', 'S''il vous plaît', 'Per favore', 'Per favoré', 3),
('it', 'restaurant', 'L''addition, s''il vous plaît', 'Il conto, per favore', 'Il conto, per favoré', 1),
('it', 'restaurant', 'Je suis allergique à...', 'Sono allergico/a a...', 'Sono alérdjico/a a...', 2),
('it', 'restaurant', 'Un plat végétarien', 'Un piatto vegetariano', 'Oun piatto védjétariano', 3),
('it', 'transport', 'Où est la station de métro ?', 'Dov''è la stazione della metro?', 'Dovè la statsioné déla métro?', 1),
('it', 'emergency', 'J''ai besoin d''aide', 'Ho bisogno di aiuto', 'O bizogno di aïouto', 1),

-- JAPANESE (Tokyo)
('ja', 'greeting', 'Bonjour', 'こんにちは (Konnichiwa)', 'Konnitchiwa', 1),
('ja', 'greeting', 'Merci', 'ありがとうございます (Arigatou gozaimasu)', 'Arigatô gozaïmass', 2),
('ja', 'greeting', 'S''il vous plaît', 'お願いします (Onegai shimasu)', 'Onégaï chimass', 3),
('ja', 'greeting', 'Excusez-moi', 'すみません (Sumimasen)', 'Soumimasséne', 4),
('ja', 'restaurant', 'L''addition, s''il vous plaît', 'お会計お願いします (Okaikei onegai shimasu)', 'Okaïkéï onégaï chimass', 1),
('ja', 'restaurant', 'Je suis allergique à...', '...アレルギーがあります (...arerugii ga arimasu)', '...aréroguii ga arimass', 2),
('ja', 'restaurant', 'C''était délicieux', 'ごちそうさまでした (Gochisousama deshita)', 'Gotchisôssama déchta', 3),
('ja', 'transport', 'Où est la gare ?', '駅はどこですか？(Eki wa doko desu ka?)', 'Éki wa doko déss ka?', 1),
('ja', 'emergency', 'J''ai besoin d''aide', '助けてください (Tasukete kudasai)', 'Tassketé koudassaï', 1),
('ja', 'emergency', 'Appelez une ambulance', '救急車を呼んでください (Kyuukyuusha wo yonde kudasai)', 'Kioukyoucha wo yondé koudassaï', 2),

-- ENGLISH (Londres, New York)
('en', 'greeting', 'Bonjour', 'Hello / Good morning', 'Hélo / Goud morning', 1),
('en', 'greeting', 'Merci', 'Thank you', 'Sank you', 2),
('en', 'restaurant', 'L''addition, s''il vous plaît', 'The check, please', 'Ze tchek, pliz', 1),
('en', 'restaurant', 'Je suis allergique à...', 'I am allergic to...', 'Aï am aleurdjik tou...', 2),
('en', 'emergency', 'J''ai besoin d''aide', 'I need help', 'Aï niid help', 1),

-- ARABIC (Marrakech)
('ar', 'greeting', 'Bonjour', 'السلام عليكم (Assalamu alaykum)', 'Assalamou aleykoum', 1),
('ar', 'greeting', 'Merci', 'شكرا (Shukran)', 'Choukrane', 2),
('ar', 'greeting', 'S''il vous plaît', 'من فضلك (Min fadlik)', 'Mine fadlik', 3),
('ar', 'restaurant', 'L''addition, s''il vous plaît', 'الحساب من فضلك (Alhisab min fadlik)', 'Al hissab mine fadlik', 1),
('ar', 'restaurant', 'Je suis allergique à...', 'عندي حساسية من... (Indi hassasiya min...)', 'Indi hassassiya mine...', 2),
('ar', 'transport', 'Combien ça coûte ?', 'بشحال؟ (Bshhal?)', 'Bchhal?', 1),
('ar', 'emergency', 'J''ai besoin d''aide', 'عاوني (Aawni)', 'Aâwni', 1),

-- THAI (Bangkok)
('th', 'greeting', 'Bonjour', 'สวัสดี (Sawasdee)', 'Sawassdii', 1),
('th', 'greeting', 'Merci', 'ขอบคุณ (Khob khun)', 'Kob koune', 2),
('th', 'restaurant', 'L''addition, s''il vous plaît', 'เก็บเงิน (Gep ngoen)', 'Guép ngueurne', 1),
('th', 'restaurant', 'Pas épicé, s''il vous plaît', 'ไม่เผ็ด (Mai phed)', 'Maï pet', 2),
('th', 'restaurant', 'Je suis allergique à...', 'ผม/ฉันแพ้... (Phom/Chan phae...)', 'Pom/Tchane pé...', 3),
('th', 'emergency', 'J''ai besoin d''aide', 'ช่วยด้วย (Chuai duai)', 'Tchouaï douaï', 1),

-- TURKISH (Istanbul)
('tr', 'greeting', 'Bonjour', 'Merhaba', 'Mérhaba', 1),
('tr', 'greeting', 'Merci', 'Teşekkür ederim', 'Téchékur édérime', 2),
('tr', 'greeting', 'S''il vous plaît', 'Lütfen', 'Lutfène', 3),
('tr', 'restaurant', 'L''addition, s''il vous plaît', 'Hesap, lütfen', 'Hessap, lutfène', 1),
('tr', 'restaurant', 'Je suis allergique à...', '...alerjim var', '...alérdjim var', 2),
('tr', 'emergency', 'J''ai besoin d''aide', 'Yardım edin', 'Yardeum édine', 1);
