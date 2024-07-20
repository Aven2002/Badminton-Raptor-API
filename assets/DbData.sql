/*Pre- defined Equipment*/
USE Badminton_Store;

/*Racquet - Shuttlecock - Bags*/
INSERT INTO equipment (
    equipName, 
    equipCategory, 
    equipBrand, 
    equipImgPath, 
    equipPrice
) VALUES
('YONEX ASTROX 88 D PRO', 'Racquet', 'YONEX', 'Racquet/ASTROX 88 D PRO.png', 839.90),
('YONEX ASTROX 100ZZ', 'Racquet', 'YONEX', 'Racquet/ASTROX 100zz.png', 899.90),
('YONEX ASTROX 70', 'Racquet', 'YONEX', 'Racquet/ASTROX 70.png', 769.00),
('YONEX NANOFLARE 1000 PLAY', 'Racquet', 'YONEX', 'Racquet/NANOFLARE 1000 PLAY.png', 309.90),
('YONEX ASTROX 99 GAME', 'Racquet', 'YONEX', 'Racquet/ASTROX 99 GAME.png', 419.90),
('LI- NING HALBERTEC 2000 WHITE GRAY', 'Racquet', 'LI- NING', 'Racquet/LI- NING HALBERTEC 2000 WHITE GRAY.png', 359.00),
('LI- NING HALBERTEC 8000 BLACK BLUE PINK', 'Racquet', 'LI- NING', 'Racquet/LI- NING HALBERTEC 8000 BLACK BLUE PINK.png', 859.00),
('LI- NING AXFORCE 100 QILIN BLACK GOLD', 'Racquet', 'LI- NING', 'Racquet/LI- NING AXFORCE 100 QILIN BLACK GOLD.png', 980.00),
('LI- NING WINDSTORM 79- S WHITE COPPER', 'Racquet', 'LI- NING', 'Racquet/LI- NING WINDSTORM 79- S WHITE COPPER.png', 360.00),
('LI- NING BLADE X 700 BLUE', 'Racquet', 'LI- NING', 'Racquet/LI- NING BLADE X 700 BLUE.png', 729.00),
('VICTOR Thruster K 15 II Badminton Racket TK-15II', 'Racquet', 'VICTOR', 'Racquet/VICTOR Thruster K 15 II Badminton Racket TK-15II.png', 475.00),
('VICTOR IRON MAN METALLIC GB D Badminton Racket MA-IRONMAN', 'Racquet', 'VICTOR', 'Racquet/VICTOR IRON MAN METALLIC GB D Badminton Racket MA-IRONMAN.png', 1050.00),
('VICTOR MJOLNIR METALLIC Limited Racket Badminton Racket MA-MJOLNIR', 'Racquet', 'VICTOR', 'Racquet/VICTOR MJOLNIR METALLIC Limited Racket Badminton Racket MA-MJOLNIR.png', 950.00),
('VICTOR BRAVESWORD 1000', 'Racquet', 'VICTOR', 'Racquet/VICTOR BRAVESWORD 1000.png', 249.00),
('VICTOR Challenger 9500 PRO Badminton Racket CHA-9500PRO', 'Racquet', 'VICTOR', 'Racquet/VICTOR Challenger 9500 PRO Badminton Racket CHA-9500PRO.png', 249.00),
('YONEX AEROSENSA 50', 'Shuttlecock', 'YONEX', 'Shuttlecock/AEROSENSA 50.png', 126.00),
('YONEX AEROSENSA 40', 'Shuttlecock', 'YONEX', 'Shuttlecock/AEROSENSA 40.png', 120.00),
('YONEX AEROCLUB 33', 'Shuttlecock', 'YONEX', 'Shuttlecock/AEROCLUB 33.png', 98.00),
('YONEX MAVIS 2000', 'Shuttlecock', 'YONEX', 'Shuttlecock/MAVIS 2000.png', 64.89),
('YONEX MAVIS 350', 'Shuttlecock', 'YONEX', 'Shuttlecock/MAVIS 350.png', 61.90),
('LI- NING C60', 'Shuttlecock', 'LI- NING', 'Shuttlecock/LI- NING C60.png', 89.00),
('LI- NING C80', 'Shuttlecock', 'LI- NING', 'Shuttlecock/LI- NING C80.png', 109.00),
('LI- NING G600', 'Shuttlecock', 'LI- NING', 'Shuttlecock/LI- NING G600.png', 119.00),
('LI- NING D8', 'Shuttlecock', 'LI- NING', 'Shuttlecock/LI- NING D8.png', 99.00),
('LI- NING G800', 'Shuttlecock', 'LI- NING', 'Shuttlecock/LI- NING G800.png', 139.00),
('VICTOR SWAN 77 Speed', 'Shuttlecock', 'VICTOR', 'Shuttlecock/VICTOR SWAN 77 Speed.png', 48.00),
('VICTOR MASTER NO.1 ', 'Shuttlecock', 'VICTOR', 'Shuttlecock/VICTOR MASTER NO.1.png', 115.00),
('VICTOR GOLD 77 Speed', 'Shuttlecock', 'VICTOR', 'Shuttlecock/VICTOR GOLD 77 Speed.png', 73.00),
('VICTOR MASTER ACE ', 'Shuttlecock', 'VICTOR', 'Shuttlecock/VICTOR MASTER ACE.png', 119.00),
('VICTOR x BWF THOMAS & UBER CUP FINALS 2024 Synthetic Shuttlecocks NCS TUC', 'Shuttlecock', 'VICTOR', 'Shuttlecock/VICTOR x BWF THOMAS & UBER CUP FINALS 2024 Synthetic Shuttlecocks NCS TUC.png', 30.00),
('YONEX LIMITED PRO TOURNAMENT BAG', 'Bags', 'YONEX', 'Bags/LIMITED PRO TOURNAMENT BAG.png', 589.00),
('YONEX EXPERT TOURNAMENT BAG', 'Bags', 'YONEX', 'Bags/EXPERT TOURNAMENT BAG.png', 559.90),
('YONEX PRO BACKPACK L', 'Bags', 'YONEX', 'Bags/PRO BACKPACK L.png', 459.00),
('YONEX OSAKA PRO RACQUET BAG', 'Bags', 'YONEX', 'Bags/OSAKA PRO RACQUET BAG.png', 719.00),
('YONEX PRO TROLLEY BAG', 'Bags', 'YONEX', 'Bags/PRO TROLLEY BAG.png', 779.90),
('LI- NING TOURNAMENT- ABJT049-1', 'Bags', 'LI- NING', 'Bags/LI- NING TOURNAMENT- ABJT049-1.png', 699.00),
('LI- NING QUBE SQUARE- ABJT055-2', 'Bags', 'LI- NING', 'Bags/LI- NING QUBE SQUARE- ABJT055-2.png', 499.00),
('LI- NING BADMINTON RACQUET BAG- ABJT009-2', 'Bags', 'LI- NING', 'Bags/LI- NING BADMINTON RACQUET BAG- ABJT009-2.png', 459.00),
('LI- NING 6-IN-1 RACQUET BAG- ABJT011-2', 'Bags', 'LI- NING', 'Bags/LI- NING 6-IN-1 RACQUET BAG- ABJT011-2.png', 359.00),
('LI- NING 6-IN-1 RACQUET BAG- ABDR647-4', 'Bags', 'LI- NING', 'Bags/LI- NING 6-IN-1 RACQUET BAG- ABDR647-4.png', 329.00),
('VICTOR BACKPACK BADMINTON BAG BR7007', 'Bags', 'VICTOR', 'Bags/VICTOR BACKPACK BADMINTON BAG BR7007.png', 309.00),
('VICTOR BACKPACK BADMINTON BAG BR9013', 'Bags', 'VICTOR', 'Bags/VICTOR BACKPACK BADMINTON BAG BR9013.png', 288.00),
('VICTOR BADMINTON RACKET BAG BR5614', 'Bags', 'VICTOR', 'Bags/VICTOR BADMINTON RACKET BAG BR5614.png', 269.00),
('VICTOR BADMINTON RACKET BAG BR5618', 'Bags', 'VICTOR', 'Bags/VICTOR BADMINTON RACKET BAG BR5618.png', 249.00),
('VICTOR x CRAYON SHINCHAN Rectangular Racket Bag BR5601CS-E', 'Bags', 'VICTOR', 'Bags/VICTOR x CRAYON SHINCHAN Rectangular Racket Bag BR5601CS-E.png', 389.00),
('YONEX POWER CUSHION ECLIPSION Z WIDE', 'Footwear', 'YONEX', 'Footwear/POWER CUSHION ECLIPSION Z WIDE.png', 519.90),
('YONEX POWER CUSHION COMFORT Z ', 'Footwear', 'YONEX', 'Footwear/POWER CUSHION COMFORT Z.png', 569.00),
('YONEX POWER CUSHION 88 DIAL UNISEX', 'Footwear', 'YONEX', 'Footwear/POWER CUSHION 88 DIAL UNISEX.png', 529.00),
('YONEX POWER CUSHION ECLIPSION Z ', 'Footwear', 'YONEX', 'Footwear/POWER CUSHION ECLIPSION Z.png', 519.90),
('YONEX POWER CUSHION CASCADE DRIVE', 'Footwear', 'YONEX', 'Footwear/POWER CUSHION CASCADE DRIVE.png', 419.90),
('LI- NING SAGA II LITE- AYTT003-3', 'Footwear', 'LI- NING', 'Footwear/LI- NING SAGA II LITE- AYTT003-3.png', 499.00),
('LI- NING THUNDER CLOUD- AYAS028-4', 'Footwear', 'LI- NING', 'Footwear/LI- NING THUNDER CLOUD- AYAS028-4.png', 799.00),
('LI- NING THUNDER CLOUD- AYAR033-1', 'Footwear', 'LI- NING', 'Footwear/LI- NING THUNDER CLOUD- AYAR033-1.png', 699.00),
('LI- NING SOUND WAVE II- AYTR009-1', 'Footwear', 'LI- NING', 'Footwear/LI- NING SOUND WAVE II- AYTR009-1.png', 329.00),
('LI- NING DF LITE- AYZT005-1', 'Footwear', 'LI- NING', 'Footwear/LI- NING DF LITE- AYZT005-1.png', 429.00),
('VICTOR P9200 HANG- C', 'Footwear', 'VICTOR', 'Footwear/VICTOR P9200 HANG- C.png', 619.00),
('VICTOR BADMINTON SHOES A301', 'Footwear', 'VICTOR', 'Footwear/VICTOR BADMINTON SHOES A301.png', 265.00),
('VICTOR 55th P9200III-55 Badminton Shoes VICTOR 55th Anniversary Collection', 'Footwear', 'VICTOR', 'Footwear/VICTOR 55th P9200III-55 Badminton Shoes VICTOR 55th Anniversary Collection.png', 459.00),
('VICTOR THUNDER AB', 'Footwear', 'VICTOR', 'Footwear/VICTOR THUNDER AB.png', 292.00),
('VICTOR x CRAYON SHINCHAN Badminton Shoes A39CS', 'Footwear', 'VICTOR', 'Footwear/VICTOR x CRAYON SHINCHAN Badminton Shoes A39CS.png', 449.00),
('YONEX MEN’S T-SHIRT 16634EX CLEAR RED', 'Apparel', 'YONEX', 'Apparel/YONEX MEN’S T-SHIRT 16634EX CLEAR RED.png', 132.90),
('YONEX MALAYSIA MASTER 2024 T-SHIRT 2842', 'Apparel', 'YONEX', 'Apparel/YONEX MALAYSIA MASTER 2024 T-SHIRT 2842.png', 64.90),
('YONEX MEN’S SLEEVELESS TOP 10497EX ', 'Apparel', 'YONEX', 'Apparel/YONEX MEN’S SLEEVELESS TOP 10497EX.png', 229.90),
('YONEX MALAYSIA MASTER 2024 ROUND NECK T-SHIRT 2857', 'Apparel', 'YONEX', 'Apparel/YONEX MALAYSIA MASTER 2024 ROUND NECK T-SHIRT 2857.png', 74.90),
('YONEX MEN’S T-SHIRT 16600EX', 'Apparel', 'YONEX', 'Apparel/YONEX MEN’S T-SHIRT 16600EX.png', 179.90),
('LI-NING MEN’S BADMINTON COMPETITION- AATT039-2', 'Apparel', 'LI- NING', 'Apparel/LI-NING MEN’S BADMINTON COMPETITION- AATT039-2.png', 229.00),
('LI-NING MEN’S BADMINTON COMPETITION- AATT017-1', 'Apparel', 'LI- NING', 'Apparel/LI-NING MEN’S BADMINTON COMPETITION- AATT017-1.png', 239.00),
('LI-NING MEN’S COMPETITION- AAYT073-5', 'Apparel', 'LI- NING', 'Apparel/LI-NING MEN’S COMPETITION- AAYT073-5.png', 299.00),
('LI-NING MEN’S BADMINTON COMPETITION- AAYT017-7', 'Apparel', 'LI- NING', 'Apparel/LI-NING MEN’S BADMINTON COMPETITION- AAYT017-7.png', 299.00),
('LI-NING MEN’S BADMINTON COMPETITION -AATT021-1', 'Apparel', 'LI- NING', 'Apparel/LI-NING MEN’S BADMINTON COMPETITION -AATT021-1.png', 239.00),
('VICTOR T- SHIRT T-40008', 'Apparel', 'VICTOR', 'Apparel/VICTOR T- SHIRT T-40008.png', 93.00),
('VICTOR T- SHIRT T-40012', 'Apparel', 'VICTOR', 'Apparel/VICTOR T- SHIRT T-40012.png', 93.00),
('VICTOR T- SHIRT T-40024', 'Apparel', 'VICTOR', 'Apparel/VICTOR T- SHIRT T-40024.png', 93.00),
('VICTOR T- SHIRT T-30030', 'Apparel', 'VICTOR', 'Apparel/VICTOR T- SHIRT T-30030.png', 66.00),
('VICTOR T- SHIRT T-40001', 'Apparel', 'VICTOR', 'Apparel/VICTOR T- SHIRT T-40001.png', 189.00),
('YONEX WET SUPER GRAP- AC102', 'Accessories', 'YONEX', 'Accessories/WET SUPER GRAP- AC102.png', 269.90),
('YONEX TOWEL GRIP- AC402', 'Accessories', 'YONEX', 'Accessories/TOWEL GRIP- AC402.png', 129.00),
('YONEX CUSHION WRAP', 'Accessories', 'YONEX', 'Accessories/CUSHION WRAP.png', 31.00),
('YONEX MOIST SUPER GRIP AC148EX 3IN1', 'Accessories', 'YONEX', 'Accessories/YONEX MOIST SUPER GRIP AC148EX 3IN1.png', 49.00),
('YONEX STRING EXBOLT 65', 'Accessories', 'YONEX', 'Accessories/YONEX STRING EXBOLT 65.png', 55.00),
('LI-NING GP 24 OVERGRIP - MIX COLOR - AXJR002-T62', 'Accessories', 'LI- NING', 'Accessories/LI-NING GP 24 OVERGRIP - MIX COLOR - AXJR002-T62.png', 48.00),
('LI-NING TEAM WRISTBAND - RED - AHWE260-2', 'Accessories', 'LI- NING', 'Accessories/TEAM WRISTBAND - RED - AHWE260-2.png', 15.00),
('LI-NING No 1 Boost String AXJN018-1', 'Accessories', 'LI- NING', 'Accessories/Li-Ning No 1 Boost String AXJN018-1.png', 59.00),
('LI-NING STRING AP 66 RAINBOW- AXJQ020-4', 'Accessories', 'LI- NING', 'Accessories/LI-NING STRING AP 66 RAINBOW- AXJQ020-4.png', 39.00),
('LI-NING GP3000 OVERGRIP - AXJR008', 'Accessories', 'LI- NING', 'Accessories/LI-NING GP3000 OVERGRIP - AXJR008.png', 89.00),
('VICTOR Badminton Over Grip GR264', 'Accessories', 'VICTOR', 'Accessories/VICTOR Badminton Over Grip GR264.png', 14.72),
('VICTOR Badminton Grip Powder AC018', 'Accessories', 'VICTOR', 'Accessories/VICTOR Badminton Grip Powder AC018.png', 21.90),
('VICTOR Towel Grips GR335', 'Accessories', 'VICTOR', 'Accessories/VICTOR Towel Grips GR335.png', 100.28),
('VICTOR Badminton Over Grip GR262-3', 'Accessories', 'VICTOR', 'Accessories/VICTOR Badminton Over Grip GR262-3.png', 33.12),
('VICTOR x CRAYON SHINCHAN Over Grip GR262CS', 'Accessories', 'VICTOR', 'Accessories/VICTOR x CRAYON SHINCHAN Over Grip GR262CS.png', 19.00);

INSERT INTO racquet (
    equipID, 
    flex, 
    frame, 
    shaft, 
    joint, 
    length, 
    weight, 
    stringAdvice, 
    color, 
    madeIn
) VALUES
(1, 'Stiff', 'HM Graphite, CFR, Tungsten', 'HM Graphite, 2G- Namd FLEX FORCE, Ultra PE Fiber', 'NEW Bulit- in T- Joint', '680mm - 10mm longer', '4U (Avg. 83g)', '20-28 lbs', 'Black, Sliver', 'Japan'),
(2, 'Extra Stiff', 'HM Graphite, Namd, Tungsten, Black Micro Core, Nanometric', 'HM Graphite, Namd', 'NEW Bulit- in T- Joint', '680mm - 10mm longer', '4U (Avg. 83g)', '20-28 lbs', 'Kurenai, Dark Navy', 'Japan'),
(3, 'Hi- Flex', 'HM Graphite, VDM, Tungsten', 'HM Graphite, Namd', 'NEW Bulit- in T- Joint', '680mm - 10mm longer', '4U (Avg. 83g)', '18-26 lbs', 'Saxe', 'Japan'),
(4, 'Medium', 'Graphite', 'Graphite', 'Bulit- in T- Joint', '680mm - 10mm longer', '4U (Avg. 83g)', '20-28 lbs', 'Lightning Yellow', 'Japan'),
(5, 'Medium', 'HM Graphite, Nanomesh Neo, Volume Cut Resin, Tungsten', 'HM Graphite, Namomesh Neo', 'Bulit- in T- Joint', '680mm - 10mm longer', '4U (Avg. 83g)', '20-28 lbs', 'White Tiger, Cherry Sunburst', 'Japan'),
(6, 'Medium', 'STD High- Modulus Carbon Fiber, Nanomesh Neo, Volume Cut Resin, Tungsten', 'STD High- Modulus Carbon Fiber', 'Bulit- in T- Joint', '675mm', '4U (Avg. 83g)', '20-27 lbs', 'White, Gray', 'China'),
(7, 'Hard', 'Med Carbon Fiber', 'STD High- Modulus Carbon Fiber', 'NEW Bulit- in T- Joint', '680mm - 10mm longer', '4UG5', '22-30 lbs', 'Black, Blue, Pink', 'China'),
(8, 'Stiff', 'Extra High Elastic Carbon Fiber', 'STD High- Modulus Carbon Fiber', 'NEW Bulit- in T- Joint', '680mm - 10mm longer', '4UG5', '23-31 lbs', 'Black, Gold', 'China'),
(9, 'High- Flex', 'Dynamic Optimum Frame', 'STD High- Modulus Carbon Fiber', 'Bulit- in T- Joint', '675mm', '5U (79g)', '20-30 lbs', 'White Copper', 'China'),
(10, 'Stiff', 'Carbon Fibre', 'Hard Flexible', 'Bulit- in T- Joint', '675mm', '3UG5', '23-31 lbs', 'Blue', 'China'),
(11, 'Medium', 'High Resilience Graphite, Hard Cored Technology', 'High Resilience Graphite, Nano Resin, 6.8 SHAFT', 'Bulit- in T- Joint', '675mm', '4UG6', '20-27 lbs', 'Dark Grey', 'Taiwan'),
(12, 'Stiff', 'High Resilience Modulus Graphite, Nano Resin, Metalic Carbon Fiber, Hard Cored Technology', 'High Resilience Modulus Graphite, Nano Resin', 'Bulit- in T- Joint', '675mm', '4UG5', '22-28 lbs', 'Red', 'Taiwan'),
(13, 'Stiff', 'High Resilience Modulus Graphite, Metalic Carbon Fiber, Hard Cored Technology', 'High Resilient Modulus Graphite, 6.8 Shaft', 'Bulit- in T- Joint', '675mm', '4UG6', '22-30 lbs', 'Blue', 'Taiwan'),
(14, 'Medium', 'Ultra High Modulus Graphite, Nano Resin', 'Ultra High Modulus Graphite, Nano Resin, 7.0 Shaft', 'Bulit- in T- Joint', '675mm', '4UG5', '20-28 lbs', 'White', 'Taiwan'),
(15, 'Medium', 'Graphite, Resin', 'Graphite, Resin, 6.8 Shaft', 'Bulit- in T- Joint', '675mm', '3UG5', '20-28 lbs', 'Pink, Blue', 'Taiwan');

INSERT INTO shuttlecock(
    equipID,
    quantityPerTube,
    description
) VALUES
(16, 12, 'YONEX AEROSENSA shuttlecocks are the official shuttlecock for the world’s leading international'),
(17, 12, 'YONEX AEROSENSA shuttlecocks are the official shuttlecock for the world’s leading international'),
(18, 12, 'Precise design delivers an exceptionally fast recovery and stable trajectory'),
(19, 6, 'Designed to be the ultimate practice and tournament shuttlecock for club players'),
(20, 6, 'The combination of close-to-feather shuttlecock flight performance and four to five times more durability'),
(21, 12, 'Recommended Ball Amateur Competitions, Flight Stabilization, Clear Ball Feel'),
(22, 12, 'Professional Choice, Flight Stabilization, Crisp Hitting Sound, Clear Ball Feel'),
(23, 12, 'Professional Choice, Natural Cork Ball Head, Flight Resistance, Precise Direction, Comfortable Feel'),
(24, 12, 'Enthusiasts Choice, Flight Resisitance'),
(25, 12, 'World Badminton Federation Designated Shuttlecock for International Competitions, Classic Game Ball, First Class goose feather and all natural cork ball head, Strong resistance to hitting accurate landing point'),
(26, 12, 'Composite Cork, Fly consistently and ideal for training & tournament'),
(27, 12, '3 Layers Cork Head, Approved by BWF for International Play, Speed 77'),
(28, 12, 'Composite Cork, Speed 77'),
(29, 12, 'Full Cork, Goose Feather, Speed 77, Approved by the BWF for international play'),
(30, 3, 'Composite Cork, Feather Material are carbon fiber and foamed plastics, Speed 75');

INSERT INTO bags(
    equipID,
    color,
    size,
    description
)VALUES
(31, 'White, Navy, Red','75 x 20 x 33cm', 'Sustainability, made with more than 70% recycled polyester'),
(32, 'White, Navy, Red','73 x 20 x 32cm', 'Zipper, Thermo Guard, Shoe Pocket'),
(33, 'White, Navy, Red','30 x 20 x 52cm', 'Zipper, Chest Belt, Water Bottle Pocket, Shoe Pocket'),
(34, 'White, Navy, Red','78 x 30 x 34cm', 'The OSAKA PRO Series was designed in collaboration with Naomi Osaka (JPN) and her sister Mari Osaka'),
(35, 'White, Navy, Red','80 x 36 x 34cm', 'Zipper'),
(36, 'Black','75 x 25 x 34cm', 'Made from premium polyester with vinyl appointments. Foam insulated sides. Two main badminton bag compartments including generous dedicated section for 6 plus rackets and another dedicated section for necessities such as shuttles, grips, wallets, phones, scissors and all other personal items. Precision-reinforced stitching with fine attention to detail.'),
(37, 'Navy White','71 x 24 x 30cm', 'The Qube by Li-Ning is a high-quality badminton kit bag, designed to provide both convenience and style. It features two front pockets for easy access to items such as shuttlecocks and grip tapes, as well as a back pocket for personal belongings like electronics. Inside, you will find two spacious compartments: one with a zip pocket to keep your valuables safe, and a net pouch for frequently used items.'),
(38, 'White, Blue','72 x 32 x 16cm', 'One compartment securely holds up to six rackets, while another organizes all your essential accessories like shuttlecocks, grips, wallets, phones, and more. This bag is the ideal choice for stylish and functional badminton players.'),
(39, 'White, Blue','72 x 24 x 30cm', 'Introducing the LI-NING 6-IN-1 RACQUET BAG in white - the perfect companion for all your racquet sports needs. This high-quality equipment bag provides ample space for up to six racquets, as well as compartments for your shoes, water bottle, and personal items. Its sleek, modern design is both functional and stylish, making it a must-have for any athlete.'),
(40, 'Gold, Black','76 x 27 x 33cm', 'Two main compartment, one side thermal and shoe compartment'),
(41, 'Black, Blue','37 x 33 x 74cm', 'Material is Polyester'),
(42, 'Black, Blue','33 x 20 x 51cm', 'Material is Polyester'),
(43, 'Black, White','76 x 20 x 33cm', 'Material are PU Leather and Polyester'),
(44, 'Green Flash','75 x 18 x 32cm', 'Material is PU Leather, Racket Compartment, Shoe Compartment, Functional front pouch for accessories'),
(45, 'Yellow','75 x 20 x 32cm', 'Material is Polyester, The multi- functional organizer in the front porch is good for organizing accessories, Professional independent shoe bag compartment protects the shoe in the most convenient and tidy manner, Professional independent racket compartment is designed to hold and organiza gear');

INSERT INTO footwear(
    equipID,
    color,
    upper,
    midsole,
    outsole,
    description
)VALUES
(46, 'White, Black', 'Synthetic Fiber', 'Synthetic Resin', 'Rubber Sole', 'Power Cushion, Double Raschel Mesh, Durable Skin Light, Power Graphite Sheet, Feather Bounce Foam'),
(47, 'Mint', 'Synthetic Fiber', 'Synthetic Resin', 'Rubber Sole', 'Power Cushion, Double Raschel Mesh, Durable Skin Light, Power Graphite Sheet, msLITE X, Feather Bounce Foam'),
(48, 'Black, Pale Blue', 'Synthetic Fiber', 'Synthetic Resin', 'Rubber Sole', 'Power Cushion, Hyper ms LITE, Durable Skin Light, Toughbrid Light, Power Graphite Sheet'),
(49, 'Navy Blue', 'Synthetic Fiber', 'Synthetic Resin', 'Rubber Sole', 'Power Cushion, Double Raschel Mesh, Durable Skin Light, Power Graphite Sheet, Feather Bounce Foam'),
(50, 'Clear Black', 'Synthetic Leather', 'Synthetic Resin', 'Rubber Sole', 'Power Cushion, Durable Skin, Double Raschel Mesh'),
(51, 'White, Yellow', 'Synthetic Fiber', 'Synthetic Resin', 'Rubber Sole', 'Step up your badminton game with the LI-NING SAGA II LITE Badminton Shoes. Designed for the modern player, these shoes combine style and performance to elevate your on-court experience.'),
(52, 'White Congo Red', 'Synthetic Fiber', 'Synthetic Resin', 'Rubber Sole', 'Multiple ventilation holes on the upper, Highly breathability, no more stuffy feet during exercise'),
(53, 'Red', 'Synthetic Fiber', 'Synthetic Resin', 'Rubber Sole', 'Arch bulit- in Carbon Fiber combined with probar loc stabilization technology and external TPU bracket. Provides dual stability and anti- teist function'),
(54, 'White', 'Synthetic Fiber', 'Synthetic Resin', 'Rubber Sole', 'Sound Wave badminton training shoes, with simple color matching, simple and generous, fashionable and versatile. The wavy midsole provides excellent cushioning. The special-textured mesh fabric combined with the leather design provides excellent wrapping and a stylish and versatile appearance. Conventional structure design, suitable for a wide range of people.'),
(55, 'White', 'Synthetic Fiber', 'Synthetic Resin', 'Rubber Sole', 'Designed for the modern athlete. These stylish shoes in the classic white color offer both durability and performance. With their lightweight design, they provide the perfect balance of support and agility on the badminton court.'),
(56, 'White', 'Microfiber PU Leather, V- Tough, Double Mesh', 'Light Shock, Light Resilient EVA, EnergyMax 3.0, TPU, Carbon Power', 'VSR Rubber', 'Size availability is from 255mm till 280mm'),
(57, 'Blue', 'PU Leather and Mesh', 'EVA, EnergyMax, Nylon Sheet', 'Rubber', 'Size availability is from 260mm till 295mm'),
(58, 'Blue', 'Microfiber PU Leather, V- Tough, Double Mesh', 'Hypereva, Solid EVA', 'VSR Rubber', 'Size availability is from 260mm till 300mm'),
(59, 'White', 'V- Durable Plus, Double Mesh', 'Light Resilient EVA, EnergyMax, TPU, Solid EVA', 'VSR Rubber', 'Size availability is from 230mm till 295mm'),
(60, 'White', 'PU Leather and Double Mesh', 'EVA, EnergyMax 3.0, TPU', 'Rubber', 'Size availability is from 220mm till 300mm');

INSERT INTO apparel(
    equipID,
    color,
    material
)VALUES
(61, 'Red', '100% Polyester'),
(62, 'White', '100% Polyester'),
(63, 'Blue', '88% Polyester , 12% Polyurethane'),
(64, 'Green', '100% Cotton'),
(65, 'Blue', '86% Nylon, 14% Polyurethane'),
(66, 'Red', '100% Polyester'),
(67, 'White', '100% Polyester'),
(68, 'Yellow', '100% Polyester'),
(69, 'Purple', '100% Polyester'),
(70, 'Blue', '100% Polyester'),
(71, 'Green', '100% Polyester'),
(72, 'White', '100% Polyester'),
(73, 'Black', '100% Polyester'),
(74, 'Red', '100% Polyester'),
(75, 'Purple', '88% Recycled Polyester + 12% Spandex');

INSERT INTO accessories(
    equipID,
    description
)VALUES
(76, 'Launched in 1987, Yonex’s best-selling overgrip - Super Grap - has sold enough grips to  wrap around the world five times. Super Grap (AC102) enhances the playability of your racquet by absorbing shock and moisture to give you outstanding levels of feel and control.'),
(77, 'Comfortable towel grip with improved absorbency.'),
(78, 'Non-slip performance with maximum absorbency'),
(79, 'Moist feel and high water absorption'),
(80, 'Quick Repulsion- Pierce through your opponent’s defense with agile drives.; Material: Core: High-Intensity Multifilament Nylon'),
(81, 'The Li-Ning GP24 is an optimal match for your grip requirements as it is ultra-light, durable, and provides extra support to your palms. Its base material is polyurethane, has a tacky texture, and is ideal for those with a dry palm. In addition, this over grip uses the classic anti-slip technology and is designed so that the racket perfectly locks in your hand.'),
(82, 'Fabric: 90% cotton, 6% Elastic, 4% Nylon. Highly absorbent for maximum comfort and superior durability High density knit cotton provides great flexibility Maintain wrist support in neutral position One size fits all Washing Instructions-Machine wash cold-Dry Flat-Do not Bleach-Do not iron-Do not dry clean'),
(83, 'CORE: Heat-Resistant, High-Intensity Nylon Multifilament; OUTER: Heat-Resistant, High-Intensity Nylon'),
(84, 'Core: Highly tensile elastic multifilament; Outer: Nylon monofilament; Coating: Special Nano-Tech'),
(85, 'Gone are the days when you had the fear of your racket slipping out of your hand. With the Li-Ning GP 3000 Badminton Grips, you get to experience utmost comfort & flawless grip. The high-quality material used assists in sweat absorption, while the non-slip technology used ensures seamless and a firm hold.'),
(86, 'Feature: Anti- slip; Material: Polyurethane and EVA'),
(87, 'The different-sized granules quickly absorb sweat from the player palm and increase friction, and furthermore avoid slip and shot accuracy while playing. This product is suitable for players who suffer from sweaty palms.'),
(88, 'Size: 30mm x 10000mm; Material: 100% Cotton; The pliable structure absorbs vibration and sweat providing players with a feeling of security and comfort while swinging'),
(89, 'Material: Polyurethane; Feature: Anti- slip; Size: 0.6 x 27 x 1050mm; This overgrip is made with a combination of moisture-absorbing and anti-slip material providing extreme comfort while holding the racket'),
(90, 'Size: 0.6 x 27 x 1050mm; This overgrip is made with a combination of moisture-absorbing and anti-slip material providing extreme comfort while holding the racket.');