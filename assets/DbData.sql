/*Pre- defined Equipment*/
USE Badminton_Store;

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
('YONEX ASTROX 99 GAME', 'Racquet', 'YONEX', 'Racquet/ASTROX 99 GAME.png', 419.90);

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
(5, 'Medium', 'HM Graphite, Nanomesh Neo, Volume Cut Resin, Tungsten', 'HM Graphite, Namomesh Neo', 'Bulit- in T- Joint', '680mm - 10mm longer', '4U (Avg. 83g)', '20-28 lbs', 'White Tiger, Cherry Sunburst', 'Japan');
