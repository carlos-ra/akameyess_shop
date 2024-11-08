import { Product } from '../types/product';


class AliExpressService {


  // Initialize mock data as class properties
  private mockCosplayProducts: Product[] = [
    {
      id: 'cos1',
      title: 'Demon Slayer Tanjiro Kamado Complete Uniform',
      price: 59.99,
      description: 'Complete Demon Slayer Corps uniform with haori jacket, pants, leg wraps, and prop sword.',
      images: [
        'https://m.media-amazon.com/images/I/711wMQzeKJL._AC_UY1000_.jpg',
        'https://m.media-amazon.com/images/I/719UvzD4IML._AC_UY1100_.jpg'
      ],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.8,
      reviews: 235,
      aliExpressLink: 'https://aliexpress.com/item/1',
      featured: true
    },
    {
      id: 'cos2',
      title: 'Genshin Impact Raiden Shogun Full Set',
      price: 89.99,
      description: 'Premium Raiden Shogun cosplay with detailed embroidery and accessories',
      images: [
        'https://m.media-amazon.com/images/I/61orG0PRROL._AC_UY1000_.jpg',
        'https://m.media-amazon.com/images/I/71ASHl-kFcL._AC_UF1000,1000_QL80_.jpg'
      ],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.9,
      reviews: 189,
      aliExpressLink: 'https://aliexpress.com/item/2',
      featured: true
    },
    {
      id: 'cos3',
      title: 'Attack on Titan Survey Corps Uniform',
      price: 79.99,
      description: 'Complete Survey Corps uniform with jacket, harness, and Wings of Freedom emblem',
      images: ['https://i.ebayimg.com/images/g/NyMAAOSwWk1eCYeF/s-l1200.jpg', 'https://m.media-amazon.com/images/I/618dS8jQqcL._AC_UY1000_.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.7,
      reviews: 312,
      aliExpressLink: 'https://aliexpress.com/item/3',
      featured: true
    },
    {
      id: 'cos4',
      title: 'Jujutsu Kaisen Gojo Satoru Uniform',
      price: 69.99,
      description: 'Jujutsu High School uniform with Gojo\'s signature blindfold',
      images: ['https://ae-pic-a1.aliexpress-media.com/kf/Sa5ee7131d30c455c9031369bfced4a2cO/Anime-Jujutsu-Kaisen-Gojo-Satoru-Cosplay-Top-Pants-Glasses-High-School-Uniform-Wig-Set-Halloween-Men.jpg_640x640Q90.jpg_.webp', 'https://i.ebayimg.com/images/g/Y74AAOSw5YNkBtny/s-l1200.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.8,
      reviews: 245,
      aliExpressLink: 'https://aliexpress.com/item/4',
      featured: false
    },
    {
      id: 'cos5',
      title: 'Chainsaw Man Denji Costume',
      price: 84.99,
      description: 'Complete Chainsaw Man Denji outfit with props and accessories',
      images: ['https://animecosplay.com.au/cdn/shop/products/s-l500_21c9478d-157f-40d6-b598-41558a9e9456.jpg?v=1672374004', 'https://preview.redd.it/8u5t5441isla1.jpg?auto=webp&s=ab919a31d4a94120ac53a86c086a551e75476c9b'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.6,
      reviews: 178,
      aliExpressLink: 'https://aliexpress.com/item/5',
      featured: true
    },
    {
      id: 'cos6',
      title: 'Spy x Family Anya Forger School Uniform',
      price: 49.99,
      description: 'Eden Academy school uniform with accessories',
      images: ['https://i5.walmartimages.com.mx/mg/gm/3pp/asr/e407dce5-44e2-43d2-8966-9f868507ec7e.52c07bc0410c96986f6569afed788b64.jpeg', 'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/83532b40-148c-488c-8ec2-025a2ae8acd5.503458a580b6ad22de9f6692dcebce20.jpeg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.9,
      reviews: 423,
      aliExpressLink: 'https://aliexpress.com/item/6',
      featured: true
    },
    {
      id: 'cos7',
      title: 'One Piece Luffy Costume Set',
      price: 54.99,
      description: 'Complete Monkey D. Luffy outfit with straw hat',
      images: ['https://m.media-amazon.com/images/I/6171xRKMkgL._AC_UY1000_.jpg', 'https://i.pinimg.com/736x/c0/a7/ec/c0a7ecc68e97bc541015e7a0e4ef7486.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.7,
      reviews: 567,
      aliExpressLink: 'https://aliexpress.com/item/7',
      featured: false
    },
    {
      id: 'cos8',
      title: 'Tokyo Revengers Manjiro Sano Uniform',
      price: 64.99,
      description: 'Complete Mikey costume with Toman jacket',
      images: ['https://http2.mlstatic.com/D_NQ_NP_763327-CBT76764020211_062024-O.webp', 'https://ae-pic-a1.aliexpress-media.com/kf/Se87c2b75bdf947af9ea92de5cc9ee0c6p/Anime-Tokyo-Revengers-Manjiro-Sano-Cosplay-Costume-Mikey-Embroidery-Uniform-Wig-Tokyo-Manji-Gang-Trench-Halloween.jpg_640x640Q90.jpg_.webp'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.5,
      reviews: 234,
      aliExpressLink: 'https://aliexpress.com/item/8',
      featured: false
    },
    {
      id: 'cos9',
      title: 'Genshin Impact Hu Tao Costume',
      price: 89.99,
      description: 'Detailed Hu Tao outfit with hat and accessories',
      images: ['https://http2.mlstatic.com/D_NQ_NP_843969-CBT78696440809_082024-O.webp', 'https://m.media-amazon.com/images/I/51wFHm5bX2L._AC_UY1000_.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.8,
      reviews: 345,
      aliExpressLink: 'https://aliexpress.com/item/9',
      featured: true
    },
    {
      id: 'cos10',
      title: 'Black Clover Asta Costume',
      price: 69.99,
      description: 'Black Bulls squad uniform with Asta\'s sword',
      images: ['https://http2.mlstatic.com/D_NQ_NP_804152-CBT50478003993_062022-O.webp', 'https://m.media-amazon.com/images/I/61LtjteA0VL._AC_UL1500_.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.6,
      reviews: 189,
      aliExpressLink: 'https://aliexpress.com/item/10',
      featured: false
    },
    {
      id: 'cos11',
      title: 'My Hero Academia Bakugo Hero Costume',
      price: 74.99,
      description: 'Complete Katsuki Bakugo hero costume with gauntlets and utility belt',
      images: ['https://i.ebayimg.com/images/g/vUgAAOSwIo9jWP0q/s-l1200.jpg', 'https://cosplayers.acparadise.com/89355/89355-45c1401ecd38716301ea68b5779613d3.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.7,
      reviews: 234,
      aliExpressLink: 'https://aliexpress.com/item/11',
      featured: false
    },
    {
      id: 'cos12',
      title: 'Naruto Hokage Cloak',
      price: 49.99,
      description: 'Fourth Hokage white cloak with flame patterns',
      images: ['https://i.pinimg.com/736x/25/4f/88/254f880ff0ec636c1533dbc75af47db1.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3T-65r-YdUS0Rit7bWiKEPtL2duREgB6-2A&s'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.8,
      reviews: 445,
      aliExpressLink: 'https://aliexpress.com/item/12',
      featured: true
    },
    {
      id: 'cos13',
      title: 'Bleach Ichigo Bankai Costume',
      price: 79.99,
      description: 'Complete Ichigo Bankai outfit with Zangetsu sword prop',
      images: ['https://http2.mlstatic.com/D_NQ_NP_641778-CBT78627024578_092024-O.webp', 'https://i.ebayimg.com/thumbs/images/g/8wEAAOSwsvJlOii4/s-l640.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.6,
      reviews: 278,
      aliExpressLink: 'https://aliexpress.com/item/13',
      featured: false
    },
    {
      id: 'cos14',
      title: 'Hunter x Hunter Killua Costume',
      price: 54.99,
      description: 'Killua Zoldyck complete outfit with skateboard prop',
      images: ['https://i.ebayimg.com/images/g/hA8AAOSwJQxdUnKi/s-l1200.jpg', 'https://http2.mlstatic.com/D_NQ_NP_921580-CBT75585563420_042024-O.webp'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.7,
      reviews: 312,
      aliExpressLink: 'https://aliexpress.com/item/14',
      featured: false
    },
    {
      id: 'cos15',
      title: 'Tokyo Ghoul Kaneki Ken Battle Suit',
      price: 69.99,
      description: 'Black battle suit with mask and kagune props',
      images: ['https://i.ebayimg.com/images/g/mfcAAOSw3yFmfSfh/s-l1200.jpg', 'https://i.ebayimg.com/images/g/I~0AAOSwxeFmsJtA/s-l400.png'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.8,
      reviews: 245,
      aliExpressLink: 'https://aliexpress.com/item/15',
      featured: true
    },
    {
      id: 'cos16',
      title: 'Sword Art Online Kirito Black Outfit',
      price: 64.99,
      description: 'Complete black swordsman costume with dual swords',
      images: ['https://ae01.alicdn.com/kf/Sf67aa6529bf7485997762e14e216b44du.jpg_640x640q90.jpg', 'https://i.pinimg.com/564x/42/ef/cf/42efcf0c6391657641bea26c8db0af4d.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.5,
      reviews: 198,
      aliExpressLink: 'https://aliexpress.com/item/16',
      featured: false
    },
    {
      id: 'cos17',
      title: 'One Punch Man Saitama Hero Costume',
      price: 49.99,
      description: 'Yellow jumpsuit with white cape and red gloves',
      images: ['https://i.ebayimg.com/images/g/p~sAAOSw1XZi~DiZ/s-l1200.jpg', 'https://myjapanclothes.com/cdn/shop/files/saitama-cosplay-one-punch-man_2.jpg?v=1700672303'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.9,
      reviews: 567,
      aliExpressLink: 'https://aliexpress.com/item/17',
      featured: true
    },
    {
      id: 'cos18',
      title: 'Dragon Ball Goku Ultra Instinct',
      price: 74.99,
      description: 'Complete Goku UI costume with silver wig',
      images: ['https://preview.redd.it/tjeuc5pdqq5a1.jpg?auto=webp&s=f9e8d907e9c1157464ae68d0c185f3dc7389450d', 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2021/03/Dragon-Ball-cosplay-Goku-Ultra-Instinto2.jpg?resize=1280%2C1280&ssl=1'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.7,
      reviews: 423,
      aliExpressLink: 'https://aliexpress.com/item/18',
      featured: true
    },
    {
      id: 'cos19',
      title: 'Fate/Stay Night Saber Armor',
      price: 129.99,
      description: 'Full Saber armor set with Excalibur prop',
      images: ['https://preview.redd.it/2ui5n2raxaa61.jpg?width=1080&crop=smart&auto=webp&s=1de59f798bb07bbe1c83f2d5364d74b9561e9dfe', 'https://i.pinimg.com/originals/20/16/96/20169677f1af6cba85ae42cf9cdb6f67.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.8,
      reviews: 189,
      aliExpressLink: 'https://aliexpress.com/item/19',
      featured: true
    },
    {
      id: 'cos20',
      title: 'Death Note L Cosplay Set',
      price: 44.99,
      description: 'Complete L outfit with wig and accessories',
      images: ['https://carboncostume.com/wordpress/wp-content/uploads/2021/02/l-from-death-note-cosplay-guide.jpg', 'https://i.redd.it/l-lawliet-from-death-note-cosplay-by-me-v0-dl3g3b7ukfnb1.jpg?width=1080&format=pjpg&auto=webp&s=08dd56cc4ab9d21befefcaec045ec3b34f9d2419'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.6,
      reviews: 234,
      aliExpressLink: 'https://aliexpress.com/item/20',
      featured: false
    },
    {
      id: 'cos21',
      title: 'Code Geass Lelouch Uniform',
      price: 69.99,
      description: 'Ashford Academy uniform with Zero mask',
      images: ['https://m.media-amazon.com/images/I/4104Gwnd+4L._AC_UY1000_.jpg', 'https://m.media-amazon.com/images/I/410aVl44JvL._AC_UY350_.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.7,
      reviews: 167,
      aliExpressLink: 'https://aliexpress.com/item/21',
      featured: false
    },
    {
      id: 'cos22',
      title: 'Full Metal Alchemist Edward Elric',
      price: 84.99,
      description: 'Complete Edward costume with red coat and automail arm',
      images: ['https://m.media-amazon.com/images/I/61zmhGQ-1gL._AC_UY1000_.jpg', 'https://i.pinimg.com/736x/0f/0f/fd/0f0ffd16f5d486297ca09b2222f7a2f0.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.8,
      reviews: 345,
      aliExpressLink: 'https://aliexpress.com/item/22',
      featured: true
    },
    {
      id: 'cos23',
      title: 'Haikyuu Karasuno Volleyball Uniform',
      price: 49.99,
      description: 'Complete volleyball team uniform with number customization',
      images: ['https://http2.mlstatic.com/D_NQ_NP_604326-CBT73447998183_122023-O.webp', 'https://http2.mlstatic.com/D_NQ_NP_906423-CBT76586096819_052024-O.webp'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.6,
      reviews: 278,
      aliExpressLink: 'https://aliexpress.com/item/23',
      featured: false
    },
    {
      id: 'cos24',
      title: 'Blue Lock Isagi Jersey',
      price: 54.99,
      description: 'Blue Lock training jersey with number and name',
      images: ['https://ae01.alicdn.com/kf/S74902e556cd84db789c348ad3dbf21ecc/Anime-Blue-Lock-Jersey-Football-Club-Sportswear-T-Shirt-Men-Isagi-Yoichi-Cosplay-Costume-Chigiri-Rensuke.jpg', 'https://www.actionfigurenow.com/wp-content/uploads/2024/03/blue_lock_yoichi_isagi_no.11_rank.299_cosplay_costume-01.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.5,
      reviews: 156,
      aliExpressLink: 'https://aliexpress.com/item/24',
      featured: false
    },
    {
      id: 'cos25',
      title: 'Persona 5 Joker Phantom Thief',
      price: 89.99,
      description: 'Complete Phantom Thief outfit with mask and gloves',
      images: ['https://down-vn.img.susercontent.com/file/0b1e71c859f8eed1164dd5e7295823d3', 'https://personacentral.com/wp-content/uploads/2017/06/P5-Hero-Costume-Cospa-1-696x696.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.9,
      reviews: 234,
      aliExpressLink: 'https://aliexpress.com/item/25',
      featured: true
    },
    {
      id: 'cos26',
      title: 'Final Fantasy VII Cloud Strife',
      price: 119.99,
      description: 'Complete SOLDIER outfit with Buster Sword prop',
      images: ['https://cdn.ezcosplay.com/media/catalog/product/f/i/final_fantasy_vii_ff7_remake_cloud_strife_-1.jpg', 'https://i.etsystatic.com/30442826/r/il/b4e610/4134547309/il_fullxfull.4134547309_qlg8.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.8,
      reviews: 189,
      aliExpressLink: 'https://aliexpress.com/item/26',
      featured: true
    },
    {
      id: 'cos27',
      title: 'Nier Automata 2B Costume',
      price: 99.99,
      description: 'Complete 2B outfit with blindfold and sword',
      images: ['https://http2.mlstatic.com/D_NQ_NP_829871-CBT75967036941_042024-O.webp', 'https://i.ebayimg.com/images/g/BYUAAOSwksBioAW8/s-l1200.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.7,
      reviews: 245,
      aliExpressLink: 'https://aliexpress.com/item/27',
      featured: true
    },
    {
      id: 'cos28',
      title: 'Fire Force Shinra Costume',
      price: 69.99,
      description: 'Fire Force Special Fire Force Company 8 uniform',
      images: ['https://www.cosplaymood.com/cdn/shop/files/Costume-cosplay-Shinra-Kusakabe-Fire-Force-uniforme.webp?v=1699549143&width=1090', 'https://ae-pic-a1.aliexpress-media.com/kf/S89343244122049c58b75ec324936e0f0K/Anime-Fire-Force-Enen-no-Shouboutai-Cosplay-Full-Set-Jacket-Pants-Tamaki-Kotatsu-Shinra-Kusakabe-Costume.jpg_640x640Q90.jpg_.webp'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.6,
      reviews: 167,
      aliExpressLink: 'https://aliexpress.com/item/28',
      featured: false
    },
    {
      id: 'cos29',
      title: 'Black Butler Sebastian Butler Uniform',
      price: 79.99,
      description: 'Complete butler uniform with tailcoat and accessories',
      images: ['https://i.pinimg.com/736x/9c/4d/5d/9c4d5dfe3a8e7ace6abc4e714b4ec5d8.jpg', 'https://m.media-amazon.com/images/I/61hIcINl-rS.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.8,
      reviews: 223,
      aliExpressLink: 'https://aliexpress.com/item/29',
      featured: false
    },
    {
      id: 'cos30',
      title: 'Violet Evergarden Military Uniform',
      price: 94.99,
      description: 'Detailed military uniform with mechanical arms props',
      images: ['https://m.media-amazon.com/images/I/61CkHaXsGUL._AC_UF894,1000_QL80_.jpg', 'https://i.pinimg.com/736x/d5/53/3b/d5533ba03865bc5651fba7c4b3a1324d.jpg'],
      category: 'cosplay',
      subCategory: 'costume',
      rating: 4.9,
      reviews: 178,
      aliExpressLink: 'https://aliexpress.com/item/30',
      featured: true
    }
  ];

  private mockWigs: Product[] = [
    {
      id: 'wig1',
      title: 'Demon Slayer Nezuko Pink Gradient Wig',
      price: 35.99,
      description: 'Long pink to black gradient wig with styled bangs, heat resistant fiber',
      images: ['https://ae01.alicdn.com/kf/S3f9e76bfa146448cb57634b9361706a7I/Kamado-Nezuko-Wig-Nezuko-Cosplay-Gradient-Long-Hair-Heat-Resistant-Synthetic-Wig-95cm-with-Free-Wig.jpg', 'https://m.media-amazon.com/images/I/71u8FT1qXjS._SL1500_.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.7,
      reviews: 156,
      aliExpressLink: 'https://aliexpress.com/item/31',
      featured: true
    },
    {
      id: 'wig2',
      title: 'Genshin Impact Raiden Shogun Purple Wig',
      price: 42.99,
      description: 'Long purple braided wig with ornaments, heat resistant',
      images: ['https://m.media-amazon.com/images/I/71wbDBcLczL.jpg', 'https://m.media-amazon.com/images/I/61cloZ1-p8L._AC_UF1000,1000_QL80_.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.8,
      reviews: 234,
      aliExpressLink: 'https://aliexpress.com/item/32',
      featured: true
    },
    {
      id: 'wig3',
      title: 'Naruto Sakura Pink Short Wig',
      price: 28.99,
      description: 'Short pink cosplay wig with styled bangs',
      images: ['https://i.ebayimg.com/images/g/lcMAAOSwt8piT~q3/s-l1200.jpg', 'https://www.rulercosplay.com/cdn/shop/products/O1CN01ifFYfJ1gsH2TiT89E__1011574197-0-cib_800x.jpg?v=1669713152'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.6,
      reviews: 189,
      aliExpressLink: 'https://aliexpress.com/item/33',
      featured: false
    },
    {
      id: 'wig4',
      title: 'My Hero Academia Todoroki Split Wig',
      price: 39.99,
      description: 'Red and white split colored wig with styled spikes',
      images: ['https://ae01.alicdn.com/kf/S2d94adf188774ac18f67bf6205c34d43K.jpg_640x640q90.jpg', 'https://i.pinimg.com/736x/0b/4d/52/0b4d528b2263fc004aa27afd93e4e5eb.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.9,
      reviews: 312,
      aliExpressLink: 'https://aliexpress.com/item/34',
      featured: true
    },
    {
      id: 'wig5',
      title: 'Attack on Titan Mikasa Black Wig',
      price: 32.99,
      description: 'Short black wig with styled layers',
      images: ['https://m.media-amazon.com/images/I/51bjuhRBP0L.jpg', 'https://m.media-amazon.com/images/I/51Ko4CmeSaL.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.7,
      reviews: 245,
      aliExpressLink: 'https://aliexpress.com/item/35',
      featured: false
    },
    {
      id: 'wig6',
      title: 'Chainsaw Man Power Long Blonde Wig',
      price: 45.99,
      description: 'Long blonde wig with horns attachments',
      images: ['https://m.media-amazon.com/images/I/71gDhCbCPoL._AC_UF1000,1000_QL80_.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTM0riNSjRzrm3ma288jWoZsfFUWhqp1OIoA&s'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.8,
      reviews: 178,
      aliExpressLink: 'https://aliexpress.com/item/36',
      featured: true
    },
    {
      id: 'wig7',
      title: 'Jujutsu Kaisen Gojo White Wig',
      price: 37.99,
      description: 'Spiky white wig with styled bangs',
      images: ['https://m.media-amazon.com/images/I/51ZFw47E3VL._AC_UF1000,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/41eGL-44k4L._AC_.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.7,
      reviews: 267,
      aliExpressLink: 'https://aliexpress.com/item/37',
      featured: true
    },
    {
      id: 'wig8',
      title: 'One Piece Nami Orange Long Wig',
      price: 41.99,
      description: 'Long orange wavy wig with styled layers',
      images: ['https://m.media-amazon.com/images/I/51JH81j8iQL._AC_UF894,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/61w7XeaQbhL.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.6,
      reviews: 198,
      aliExpressLink: 'https://aliexpress.com/item/38',
      featured: false
    },
    {
      id: 'wig9',
      title: 'Tokyo Revengers Mikey Blonde Wig',
      price: 34.99,
      description: 'Medium length blonde wig with styled bangs',
      images: ['https://ae01.alicdn.com/kf/S1fa291c17a8141b18504c1a8d4fc056dJ/High-Quality-Anime-Tokyo-Revengers-Sano-Manjiro-Cosplay-Wig-Mikey-Light-Blonde-Short-Heat-Resistant-Hair.jpg', 'https://m.media-amazon.com/images/I/61J1zkRIulL._AC_UF1000,1000_QL80_.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.5,
      reviews: 156,
      aliExpressLink: 'https://aliexpress.com/item/39',
      featured: false
    },
    {
      id: 'wig10',
      title: 'Bleach Ichigo Orange Spiky Wig',
      price: 36.99,
      description: 'Short spiky orange wig with styled layers',
      images: ['https://down-my.img.susercontent.com/file/cn-11134207-7r98o-lzrsguw0gcki92', 'https://ae01.alicdn.com/kf/Sc8dfdc898fb4421a961291b0cb0638c9y.jpg_640x640Q90.jpg_.webp'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.7,
      reviews: 289,
      aliExpressLink: 'https://aliexpress.com/item/40',
      featured: true
    },
    {
      id: 'wig11',
      title: 'Genshin Impact Venti Green Wig',
      price: 38.99,
      description: 'Long green braided wig with gradient effect',
      images: ['https://m.media-amazon.com/images/I/51uyuXvwVML.jpg', 'https://www.gcosplay.com/cdn/shop/files/1_92eb213b-d7f8-4d70-9847-173778dddac1.jpg?v=1712560610&width=416'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.6,
      reviews: 167,
      aliExpressLink: 'https://aliexpress.com/item/41',
      featured: false
    },
    {
      id: 'wig12',
      title: 'Demon Slayer Zenitsu Blonde Wig',
      price: 33.99,
      description: 'Spiky blonde wig with black highlights',
      images: ['https://www.uniqso.com/cdn/shop/products/CS-461A3.jpg?v=1683252881', 'https://cdn11.bigcommerce.com/s-n6wlwd/images/stencil/original/products/41979/56272/WG002_1080x__15377.1643669028.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.7,
      reviews: 234,
      aliExpressLink: 'https://aliexpress.com/item/42',
      featured: true
    },
    {
      id: 'wig13',
      title: 'Jujutsu Kaisen Nobara Wig',
      price: 31.99,
      description: 'Medium length ginger wig with styled bangs',
      images: ['https://i.ebayimg.com/00/s/ODAwWDgwMA==/z/5mwAAOSw79VfmpN6/$_12.JPG?set_id=880000500F', 'https://m.media-amazon.com/images/I/615l8yv4BQS._AC_UF1000,1000_QL80_.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.5,
      reviews: 145,
      aliExpressLink: 'https://aliexpress.com/item/43',
      featured: false
    },
    {
      id: 'wig14',
      title: 'Chainsaw Man Makima Red Wig',
      price: 43.99,
      description: 'Long straight red wig with styled bangs',
      images: ['https://m.media-amazon.com/images/I/711S7NXYjfL._AC_UF894,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/51EzOAxetmL.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.8,
      reviews: 312,
      aliExpressLink: 'https://aliexpress.com/item/44',
      featured: true
    },
    {
      id: 'wig15',
      title: 'Spy x Family Anya Pink Wig',
      price: 29.99,
      description: 'Short pink wig with side horns',
      images: ['https://m.media-amazon.com/images/I/61JYPY6hzEL._AC_UF1000,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/514aEpaKjyL._AC_UF1000,1000_QL80_.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.9,
      reviews: 278,
      aliExpressLink: 'https://aliexpress.com/item/45',
      featured: true
    },
    {
      id: 'wig16',
      title: 'One Piece Boa Hancock Black Wig',
      price: 46.99,
      description: 'Extra long straight black wig with styled bangs',
      images: ['https://m.media-amazon.com/images/I/715MiTLaOML.jpg', 'https://ae-pic-a1.aliexpress-media.com/kf/S11678a483b5642eba87a07d5715ef69cS/100cm-Long-Boa-Hancock-Cosplay-Wig-Anime-Women-Boa-Hancock-Wigs-Black-Wig-Heat-Resistant-Synthetic.jpg_640x640Q90.jpg_.webp'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.7,
      reviews: 198,
      aliExpressLink: 'https://aliexpress.com/item/46',
      featured: false
    },
    {
      id: 'wig17',
      title: 'Hunter x Hunter Hisoka Pink Wig',
      price: 35.99,
      description: 'Spiky pink wig with styled points',
      images: ['https://m.media-amazon.com/images/I/51Ecual7zQL.jpg', 'https://ae01.alicdn.com/kf/H1f5b9185a7a64cdab316a1a5f34916f9f.jpg_960x960.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.6,
      reviews: 167,
      aliExpressLink: 'https://aliexpress.com/item/47',
      featured: false
    },
    {
      id: 'wig18',
      title: 'Black Clover Noelle Silver Wig',
      price: 39.99,
      description: 'Long silver twintail wig with drill curls',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoJfbcng1U-y8Ia8EYto6GcMR__l7zSSrvcw&s', 'https://preview.redd.it/noelle-silva-black-clover-v0-csc9tal3o4rc1.jpg?width=640&crop=smart&auto=webp&s=9a9fc82f4729f46dc6acf2ad944eb016a05e8815'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.8,
      reviews: 245,
      aliExpressLink: 'https://aliexpress.com/item/48',
      featured: true
    },
    {
      id: 'wig19',
      title: 'Dragon Ball Bulma Blue Wig',
      price: 32.99,
      description: 'Short blue wig with natural wave',
      images: ['https://ae01.alicdn.com/kf/Sbe31bfd3681440e78f1744a321359e3at.jpg_960x960.jpg', 'https://wig-supplier.com/cdn/shop/files/dragon_ball_bulma_syraight_blue_green_cosplay_wig6_c3a4e71f-d912-451b-bb72-a8ed6a4f10e6_grande.jpg?v=1719535475'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.5,
      reviews: 156,
      aliExpressLink: 'https://aliexpress.com/item/49',
      featured: false
    },
    {
      id: 'wig20',
      title: 'Naruto Hinata Long Purple Wig',
      price: 37.99,
      description: 'Long straight dark purple wig with hime cut',
      images: ['https://m.media-amazon.com/images/I/415mR402YjL.jpg', 'https://www.uniqso.com/cdn/shop/files/CS-621A-_1.jpg?v=1715770507'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.7,
      reviews: 289,
      aliExpressLink: 'https://aliexpress.com/item/50',
      featured: true
    },
    {
      id: 'wig21',
      title: 'Fire Force Maki Green Wig',
      price: 34.99,
      description: 'Short dark green wig with natural styling',
      images: ['https://i.ebayimg.com/images/g/XXQAAOSwDZNk~uwC/s-l400.png', 'https://m.media-amazon.com/images/I/51N2ODq7PpS.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.4,
      reviews: 134,
      aliExpressLink: 'https://aliexpress.com/item/51',
      featured: false
    },
    {
      id: 'wig22',
      title: 'Genshin Impact Yae Miko Pink Wig',
      price: 48.99,
      description: 'Long pink wig with fox ears and braids',
      images: ['https://m.media-amazon.com/images/I/61zsfmCwkjL.jpg', 'https://m.media-amazon.com/images/I/71XJyh8SRwL._AC_UF1000,1000_QL80_.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.9,
      reviews: 345,
      aliExpressLink: 'https://aliexpress.com/item/52',
      featured: true
    },
    {
      id: 'wig23',
      title: 'Death Note Misa Blonde Wig',
      price: 36.99,
      description: 'Medium length blonde wig with pigtails',
      images: ['https://m.media-amazon.com/images/I/51AW5eICFKL._AC_UF1000,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/51EXrNbp0zL.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.6,
      reviews: 178,
      aliExpressLink: 'https://aliexpress.com/item/53',
      featured: false
    },
    {
      id: 'wig24',
      title: 'Code Geass CC Green Wig',
      price: 41.99,
      description: 'Extra long lime green straight wig',
      images: ['https://m.media-amazon.com/images/I/41DXpg8RvlS._AC_UF1000,1000_QL80_.jpg', 'https://wig-supplier.com/cdn/shop/files/code_geass_c.c._long_light_green_cosplay_wig2_62071b28-52a8-40bc-a52b-1d2eccfe94f7.jpg?v=1719536797&width=800'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.7,
      reviews: 267,
      aliExpressLink: 'https://aliexpress.com/item/54',
      featured: true
    },
    {
      id: 'wig25',
      title: 'Sailor Moon Usagi Blonde Wig',
      price: 44.99,
      description: 'Long blonde wig with signature odango buns',
      images: ['https://i.ebayimg.com/images/g/CJAAAOSwFBdijp8j/s-l1200.jpg', 'https://m.media-amazon.com/images/I/61HZpWEp2DL._AC_UF1000,1000_QL80_.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.8,
      reviews: 412,
      aliExpressLink: 'https://aliexpress.com/item/55',
      featured: true
    },
    {
      id: 'wig26',
      title: 'Tokyo Ghoul Touka Purple Wig',
      price: 33.99,
      description: 'Short purple wig with side swept bangs',
      images: ['https://ae01.alicdn.com/kf/S9ad9005e85b9410a9079bf838163bf9a3.jpg_640x640q90.jpg', 'https://i.ebayimg.com/images/g/KfkAAOSwzhhkHWit/s-l400.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.5,
      reviews: 189,
      aliExpressLink: 'https://aliexpress.com/item/56',
      featured: false
    },
    {
      id: 'wig27',
      title: 'Fate/Stay Night Saber Blonde Wig',
      price: 39.99,
      description: 'Medium length blonde wig with ahoge',
      images: ['https://www.dhresource.com/webp/m/0x0/f2/albu/g15/M01/7B/B4/rBVa3V-FWSeAOR_YAAFwb43iZqk238.jpg', 'https://m.media-amazon.com/images/I/419CQdu98vL._AC_UF350,350_QL80_.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.7,
      reviews: 234,
      aliExpressLink: 'https://aliexpress.com/item/57',
      featured: true
    },
    {
      id: 'wig28',
      title: 'Blue Lock Bachira Green Wig',
      price: 35.99,
      description: 'Short spiky green and black wig',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDRpbsVGOtTM--1qLtAWdxeO3HQwiukSIAZA&s', 'https://aliexpress-images.spocket.co/1005005540084978.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.4,
      reviews: 145,
      aliExpressLink: 'https://aliexpress.com/item/58',
      featured: false
    },
    {
      id: 'wig29',
      title: 'Haikyuu Kenma Pudding Wig',
      price: 37.99,
      description: 'Two-tone blonde and black wig',
      images: ['https://ae01.alicdn.com/kf/Sba298e7047644de3b40b8fcd85d5f6f2d.jpg_640x640q90.jpg', 'https://m.media-amazon.com/images/I/31sSoagCJGS._AC_UF1000,1000_QL80_.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.6,
      reviews: 198,
      aliExpressLink: 'https://aliexpress.com/item/59',
      featured: false
    },
    {
      id: 'wig30',
      title: 'Final Fantasy VII Aerith Brown Wig',
      price: 42.99,
      description: 'Long braided brown wig with bow',
      images: ['https://m.media-amazon.com/images/I/41CwboZbZpS._AC_UF1000,1000_QL80_.jpg', 'https://ae01.alicdn.com/kf/Sfb1a1b8a18ec4edcbfc2884949d1c859Z.jpg_640x640q90.jpg'],
      category: 'cosplay',
      subCategory: 'wig',
      rating: 4.8,
      reviews: 289,
      aliExpressLink: 'https://aliexpress.com/item/60',
      featured: true
    }
  ];

  private mockLenses: Product[] = [
    {
      id: 'lens1',
      title: 'Naruto Sharingan Contact Lenses',
      price: 24.99,
      description: 'Realistic Sharingan pattern lenses, comfortable for all-day wear',
      images: ['https://misakicon.com/cdn/shop/files/sharingan.jpg?v=1697597340', 'https://wantlens.com/wp-content/uploads/2023/06/S5f2e1c81700e4133bdcfbc092b9dddcdj-600x600.webp'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.8,
      reviews: 423,
      aliExpressLink: 'https://aliexpress.com/item/61',
      featured: true
    },
    {
      id: 'lens2',
      title: 'Tokyo Ghoul Kaneki Ken Red Eye Lens',
      price: 22.99,
      description: 'Single red and black ghoul eye lens with natural blend',
      images: ['https://cdn.colored-contacts.us/wp-content/uploads/2024/09/Kaneki-Ken-Cosplay-White-And-Red-Contact-Lenses-650x650.jpg', 'https://www.finallure.com/cdn/shop/files/B2232.jpg?v=1692849209'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.7,
      reviews: 312,
      aliExpressLink: 'https://aliexpress.com/item/62',
      featured: true
    },
    {
      id: 'lens3',
      title: 'Attack on Titan Eren Titan Lenses',
      price: 26.99,
      description: 'Bright green titan shifter contact lenses',
      images: ['https://cdn.colored-contacts.us/wp-content/uploads/2024/05/vega-green-detail2-650x650.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl4Pzs2LjRgrvlxmOnPpcAT01goSjx8srV7w&s'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.6,
      reviews: 245,
      aliExpressLink: 'https://aliexpress.com/item/63',
      featured: false
    },
    {
      id: 'lens4',
      title: 'Demon Slayer Rengoku Flame Lenses',
      price: 23.99,
      description: 'Bright orange flame pattern contact lenses',
      images: ['https://www.pinkyparadise.com/cdn/shop/products/G18-COSRENGOKU-2.jpg?v=1634714765', 'https://cdn.colored-contacts.us/wp-content/uploads/2023/05/Demon-Slayer-Kyojuro-Rengoku-Cosplay-Contact-Lenses-650x650.jpg'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.5,
      reviews: 189,
      aliExpressLink: 'https://aliexpress.com/item/64',
      featured: false
    },
    {
      id: 'lens5',
      title: 'Jujutsu Kaisen Gojo Blue Lenses',
      price: 25.99,
      description: 'Bright blue infinity pattern contact lenses',
      images: ['https://halloweencontactlenses.com.au/cdn/shop/files/vv12cc.jpg?v=1693316333', 'https://www.uniqso.com/cdn/shop/products/31.jpg?v=1649471318'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.9,
      reviews: 356,
      aliExpressLink: 'https://aliexpress.com/item/65',
      featured: true
    },
    {
      id: 'lens6',
      title: 'Black Butler Sebastian Demon Lenses',
      price: 27.99,
      description: 'Bright red demon contract lenses with detailed pattern',
      images: ['https://samhaincontactlenses.com/wp-content/uploads/2018/05/140363573468357.jpg', 'https://static.wikia.nocookie.net/kuroshitsuji/images/e/ec/OP1_V2_14.png/revision/latest?cb=20110918171343'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.7,
      reviews: 278,
      aliExpressLink: 'https://aliexpress.com/item/66',
      featured: false
    },
    {
      id: 'lens7',
      title: 'Chainsaw Man Denji Devil Lenses',
      price: 24.99,
      description: 'Bright orange devil eye contact lenses',
      images: ['https://cdn.shopify.com/s/files/1/0829/6480/7999/files/Chainsaw_Man_Power_Yellow_Colored_Contact_Lenses_480x480.webp?v=1719307425', 'https://cdn.colored-contacts.us/wp-content/uploads/2023/04/Chainsaw-Man-Denji-Cosplay-Contact-Lenses.jpg'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.8,
      reviews: 198,
      aliExpressLink: 'https://aliexpress.com/item/67',
      featured: true
    },
    {
      id: 'lens8',
      title: 'Code Geass Lelouch Geass Lenses',
      price: 28.99,
      description: 'Purple Geass command symbol contact lenses',
      images: ['https://http2.mlstatic.com/D_NQ_NP_861380-MCO46971587285_082021-O.webp', 'https://ae01.alicdn.com/kf/S028bc9aeb1e6434fa1b3949d0c25b1ddC/Pseyeche-Halloween-Color-Contact-Lenses-Code-Geass-Pink-Color-Cosplay-Contact-Lens-1-Pair-Yearly-Blood.jpg'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.9,
      reviews: 345,
      aliExpressLink: 'https://aliexpress.com/item/68',
      featured: true
    },
    {
      id: 'lens9',
      title: 'Dragon Ball Saiyan Lenses',
      price: 23.99,
      description: 'Turquoise Super Saiyan contact lenses',
      images: ['https://www.primalcontactlenses.com/cdn/shop/products/22970-SaiyanROUND.jpg?v=1643734666', 'https://i.shgcdn.com/993aaf4f-f340-4974-b29b-e1aac8aa17a5/-/format/auto/-/preview/3000x3000/-/quality/lighter/'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.6,
      reviews: 167,
      aliExpressLink: 'https://aliexpress.com/item/69',
      featured: false
    },
    {
      id: 'lens10',
      title: 'Fate/Stay Night Saber Green Lenses',
      price: 25.99,
      description: 'Bright emerald green contact lenses',
      images: ['https://cdn.colored-contacts.us/wp-content/uploads/2024/05/vega-green-detail3-650x650.jpg', 'https://cdn.colored-contacts.us/wp-content/uploads/2022/10/Genshin-Impact-Yelan-Cosplay-Contacts-900x900.jpg'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.7,
      reviews: 234,
      aliExpressLink: 'https://aliexpress.com/item/70',
      featured: false
    },
    {
      id: 'lens11',
      title: 'Hunter x Hunter Kurapika Scarlet Lenses',
      price: 26.99,
      description: 'Bright scarlet red Kurta clan contact lenses',
      images: ['https://lumeye.com/cdn/shop/products/04_ed6087ef-6ec9-4129-8b31-638d3c666975.jpg?v=1658470542', 'https://lumeye.com/cdn/shop/products/01_0f2509d2-08f1-4618-bd1c-da9b2640dbe6.jpg?v=1658470542'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.8,
      reviews: 289,
      aliExpressLink: 'https://aliexpress.com/item/71',
      featured: true
    },
    {
      id: 'lens12',
      title: 'Bleach Hollow Lenses',
      price: 24.99,
      description: 'Black and yellow hollow eye contact lenses',
      images: ['https://pseyeche.com/cdn/shop/products/B2233-B1.jpg?v=1660558910', 'https://www.lens.com/common/assets/ProdStandard/Y69.jpg'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.5,
      reviews: 178,
      aliExpressLink: 'https://aliexpress.com/item/72',
      featured: false
    },
    {
      id: 'lens13',
      title: 'Death Note Shinigami Lenses',
      price: 27.99,
      description: 'Red shinigami eye contact lenses',
      images: ['https://honeycolor.com/cdn/shop/products/crtrd-eye_1.jpg?v=1703263185', 'https://honeycolor.com/cdn/shop/products/c238-eye_1.jpg?v=1703264223'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.6,
      reviews: 245,
      aliExpressLink: 'https://aliexpress.com/item/73',
      featured: false
    },
    {
      id: 'lens14',
      title: 'One Piece Mihawk Hawk Eye Lenses',
      price: 25.99,
      description: 'Yellow hawk-like contact lenses',
      images: ['https://img-va.myshopline.com/image/store/2002382959/1663906478004/MCLEYE-Nebulos-Yellow-Yearly-Cosplay-Contact-Lenses_1.jpeg?w=800&h=800', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOgxdP0ToQqoMBu6C7kknfTFlZMspbkIEIGQ&s'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.7,
      reviews: 312,
      aliExpressLink: 'https://aliexpress.com/item/74',
      featured: true
    },
    {
      id: 'lens15',
      title: 'Demon Slayer Muzan Lenses',
      price: 23.99,
      description: 'Red demon king contact lenses with kanji pattern',
      images: ['https://www.uniqso.com/cdn/shop/products/Artboard5-80_d8fb5a3a-4595-4b3a-9d5f-4b4db9be91db.jpg?v=1680833547', 'https://img.staticdj.com/bbbc3ee2ae11a13c259b9035495f3aa0_750x.jpg'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.8,
      reviews: 267,
      aliExpressLink: 'https://aliexpress.com/item/75',
      featured: true
    },
    {
      id: 'lens16',
      title: 'Naruto Byakugan Lenses',
      price: 26.99,
      description: 'White Hyuga clan Byakugan contact lenses',
      images: ['https://mycolorlenses.com/cdn/shop/products/neji.png?v=1580136468', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAC54Q-wUSrEstcFJc582GxL08bEcfScy7w&s'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.7,
      reviews: 198,
      aliExpressLink: 'https://aliexpress.com/item/76',
      featured: true
    },
    {
      id: 'lens17',
      title: 'Tokyo Ghoul Rize Lenses',
      price: 24.99,
      description: 'Purple ghoul eye contact lenses',
      images: ['https://ilovelens.com/cdn/shop/products/c423-timg-01.jpg?v=1616482503', 'https://cosplayshopper.com/media/catalog/product/cache/1/image/650x/d9e1aab3ff6d4b19f6110704db2ea214/C/O/COS-047_01_59.jpg'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.5,
      reviews: 156,
      aliExpressLink: 'https://aliexpress.com/item/77',
      featured: false
    },
    {
      id: 'lens18',
      title: 'Black Butler Claude Golden Lenses',
      price: 25.99,
      description: 'Golden demon butler contact lenses',
      images: ['https://looxcontacts.com/cdn/shop/files/Loox_Angelic_Yellow_Contact_Lens_Pair_09026_b9867eff-d7b3-4ac9-981e-10cc10d49eb5.jpg?v=1713827158&width=900', 'https://www.lens.me/media/catalog/product/y/e/yellow_cat_eye.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=363&width=450&canvas=450:363'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.6,
      reviews: 189,
      aliExpressLink: 'https://aliexpress.com/item/78',
      featured: false
    },
    {
      id: 'lens19',
      title: 'Naruto Rinnegan Lenses',
      price: 28.99,
      description: 'Purple ripple pattern Rinnegan contact lenses',
      images: ['https://wantlens.com/wp-content/uploads/2023/06/Seeeff1e2b45545149bf76b94854101040-1.jpg_960x960-1.jpg', 'https://cdn11.bigcommerce.com/s-izu49/images/stencil/1280x1280/products/18686/29496/505P981__02854.1727197158.jpg?c=2'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.9,
      reviews: 423,
      aliExpressLink: 'https://aliexpress.com/item/79',
      featured: true
    },
    {
      id: 'lens20',
      title: 'Attack on Titan Pure Titan Lenses',
      price: 23.99,
      description: 'Glowing white titan contact lenses',
      images: ['https://cdn.colored-contacts.us/wp-content/uploads/2022/10/Genshin-Impact-Yelan-Cosplay-Contacts-650x650.jpg', 'https://cdn.colored-contacts.us/wp-content/uploads/2024/05/vega-green-detail2-650x650.jpg'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.4,
      reviews: 145,
      aliExpressLink: 'https://aliexpress.com/item/80',
      featured: false
    },
    {
      id: 'lens21',
      title: 'Demon Slayer Nezuko Demon Lenses',
      price: 26.99,
      description: 'Pink demon slayer contact lenses with pattern',
      images: ['https://www.uniqso.com/cdn/shop/products/animecloudpinka.jpg?v=1649297835', 'https://lensmate.co.uk/cdn/shop/files/NezukoDemon.jpg?v=1696330366'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.8,
      reviews: 278,
      aliExpressLink: 'https://aliexpress.com/item/81',
      featured: true
    },
    {
      id: 'lens22',
      title: 'Blue Exorcist Satan Flame Lenses',
      price: 25.99,
      description: 'Blue flame pattern demon contact lenses',
      images: ['https://cdn.colored-contacts.us/wp-content/uploads/2024/09/Rin-Okumura-Cosplay-Blue-Contact-Lenses.jpg', 'https://lensmate.co.uk/cdn/shop/collections/cool_blue_1_1_1.jpg?v=1691072007'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.6,
      reviews: 167,
      aliExpressLink: 'https://aliexpress.com/item/82',
      featured: false
    },
    {
      id: 'lens23',
      title: 'Naruto Sage Mode Lenses',
      price: 24.99,
      description: 'Yellow toad sage mode contact lenses',
      images: ['https://halloweencontactlenses.com.au/cdn/shop/products/ezgif.com-gif-maker_8052631a-66ae-4b0f-99fd-828c17c7f41c.jpg?v=1656482637&width=678', 'https://www.finallure.com/cdn/shop/files/10003_50f5b04f-8091-41e5-b34c-3e611b951c4a.jpg?v=1693217563&width=1445'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.7,
      reviews: 234,
      aliExpressLink: 'https://aliexpress.com/item/83',
      featured: false
    },
    {
      id: 'lens24',
      title: 'Bleach Aizen Hogyoku Lenses',
      price: 27.99,
      description: 'Purple butterfly pattern Hogyoku contact lenses',
      images: ['https://eyefreshgo.com/cdn/shop/products/Glass-Ball-Black-Colored-Contacts-With-Eye-Effect-And-Plan-Lens_e182dc89-a9bf-45f4-9f81-091c8664a987_1000x.jpg?v=1640765113', 'https://honeycolor.com/cdn/shop/products/whc244-eye_1.jpg?crop=center&height=709&v=1703263549&width=645'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.8,
      reviews: 198,
      aliExpressLink: 'https://aliexpress.com/item/84',
      featured: true
    },
    {
      id: 'lens25',
      title: 'One Piece Law Surgeon Lenses',
      price: 23.99,
      description: 'Grey surgeon of death contact lenses',
      images: ['https://cdn.colored-contacts.us/wp-content/uploads/2024/08/Trafalgar-Law-Cosplay-Contact-Lenses-New-650x650.jpg', 'https://cdn.colored-contacts.us/wp-content/uploads/2024/05/vega-green-detail3-650x650.jpg'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.5,
      reviews: 156,
      aliExpressLink: 'https://aliexpress.com/item/85',
      featured: false
    },
    {
      id: 'lens26',
      title: 'Naruto Madara Eternal Mangekyo Lenses',
      price: 28.99,
      description: 'Complex Eternal Mangekyo Sharingan pattern lenses',
      images: ['https://img.staticdj.com/108d76ad10bd33b34a064b18cd4d0183_750x.jpg', 'https://cdn11.bigcommerce.com/s-gzyh4k/images/stencil/800x1000/products/734/7080/F84_Madara_Uchiha_Clan_Madaras_Eternal_Mangekyou_Sharingan_red_circle_lenses_usa_cosplay_costume_cosmetic_contact_lens__25063.1631748219.jpg?c=2'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.9,
      reviews: 345,
      aliExpressLink: 'https://aliexpress.com/item/86',
      featured: true
    },
    {
      id: 'lens27',
      title: 'Dragon Ball Ultra Instinct Lenses',
      price: 25.99,
      description: 'Silver Ultra Instinct contact lenses',
      images: ['https://m.media-amazon.com/images/I/5164JAvULoL._AC_.jpg', 'https://misakicon.com/cdn/shop/products/Grey-Colored-Contacts-pro-series.jpg?v=1573534207&width=533'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.7,
      reviews: 267,
      aliExpressLink: 'https://aliexpress.com/item/87',
      featured: false
    },
    {
      id: 'lens28',
      title: 'Demon Slayer Inosuke Beast Lenses',
      price: 24.99,
      description: 'Light blue beast breathing contact lenses',
      images: ['https://cdn.colored-contacts.us/wp-content/uploads/2023/05/Demon-Slayer-Inosuke-Hashibira-Cosplay-Contact-Lenses-650x650.jpg', 'https://cdn.colored-contacts.us/wp-content/uploads/2023/05/Demon-Slayer-Inosuke-Hashibira-Cosplay-Contact-Lenses-detail.jpg'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.6,
      reviews: 189,
      aliExpressLink: 'https://aliexpress.com/item/88',
      featured: false
    },
    {
      id: 'lens29',
      title: 'Tokyo Ghoul Uta Lenses',
      price: 26.99,
      description: 'Red and black kakugan contact lenses',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8eeHAQOoIT54b6rP73i5F4jVtJHnnFy9cHQ&s', 'https://i.pinimg.com/736x/35/9e/a2/359ea27a131589aa10a3338e13317ec2.jpg'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.8,
      reviews: 223,
      aliExpressLink: 'https://aliexpress.com/item/89',
      featured: true
    },
    {
      id: 'lens30',
      title: 'Naruto Tenseigan Lenses',
      price: 29.99,
      description: 'Blue flower pattern Tenseigan contact lenses',
      images: ['https://m.media-amazon.com/images/I/71z+CZAigUL.jpg', 'https://static.wikia.nocookie.net/naruto/images/d/d6/Tenseigan_Symbol.svg/revision/latest/scale-to-width-down/200?cb=20180208143426'],
      category: 'cosplay',
      subCategory: 'lens',
      rating: 4.9,
      reviews: 312,
      aliExpressLink: 'https://aliexpress.com/item/90',
      featured: true
    }
  ];

  private mockBeautyProducts: Product[] = [
    {
      id: 'beauty1',
      title: 'COSRX Advanced Snail 96 Mucin Power Essence',
      price: 19.99,
      description: 'Korean skincare essence with 96% snail secretion filtrate',
      images: ['https://chokchokskin.co/cdn/shop/products/Cosrx_-Advanced-Snail-96-Mucin-Power-Essence.jpg?v=1660707388', 'https://chokchokskin.co/cdn/shop/products/1_31-Soko-Glam-PDP-Image-COSRX-Advanced-Snail-96-Mucin-Power-Essence-Product-Lifestyle_860x_jpg_720x.webp?v=1660707388'],
      category: 'beauty',
      subCategory: 'skincare',
      rating: 4.9,
      reviews: 1250,
      aliExpressLink: 'https://aliexpress.com/item/91',
      featured: true
    },
    {
      id: 'beauty2',
      title: 'SOME BY MI AHA-BHA-PHA 30 Days Miracle Toner',
      price: 16.99,
      description: 'Exfoliating toner with 3 types of acids for clear skin',
      images: ['https://chokchokskin.co/cdn/shop/files/SomeByMi_AHABHAPHA30daysMiracleToner05_1800x1800.jpg?v=1721258996', 'https://www.pambu.co/cdn/shop/products/3.png?v=1613751749&width=1200'],
      category: 'beauty',
      subCategory: 'skincare-toner',
      rating: 4.7,
      reviews: 892,
      aliExpressLink: 'https://aliexpress.com/item/92',
      featured: true
    },
    {
      id: 'beauty3',
      title: 'Innisfree Green Tea Seed Serum',
      price: 21.99,
      description: 'Hydrating serum with Jeju green tea extract',
      images: ['https://www.pambu.co/cdn/shop/products/11_96c7befd-c1d1-4d18-bc64-790e97b3ec4c.png?v=1644113540&width=1200', 'https://images.rappi.com/products/9816b020-f8f0-45ad-b3b1-45623f442ae6.png'],
      category: 'beauty',
      subCategory: 'skincare-serum',
      rating: 4.8,
      reviews: 756,
      aliExpressLink: 'https://aliexpress.com/item/93',
      featured: true
    },
    {
      id: 'beauty4',
      title: 'Laneige Water Sleeping Mask',
      price: 24.99,
      description: 'Overnight hydrating mask with mineral water complex',
      images: ['https://blushbar.vtexassets.com/arquivos/ids/203402/8809803507417_2.jpg?v=638445768045470000', 'https://www.sephora.com/productimages/sku/s2535243-av-23-zoom.jpg?imwidth=315'],
      category: 'beauty',
      subCategory: 'skincare-mask',
      rating: 4.8,
      reviews: 934,
      aliExpressLink: 'https://aliexpress.com/item/94',
      featured: true
    },
    {
      id: 'beauty5',
      title: 'Etude House Soon Jung pH 5.5 Relief Toner',
      price: 15.99,
      description: 'Gentle pH balanced toner for sensitive skin',
      images: ['https://http2.mlstatic.com/D_NQ_NP_627117-MLU54960453281_042023-O.webp', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuLcfu7zIUAOKszWbLxOxtBkIfvZau3AOL8Q&s'],
      category: 'beauty',
      subCategory: 'skincare-toner',
      rating: 4.7,
      reviews: 645,
      aliExpressLink: 'https://aliexpress.com/item/95',
      featured: false
    },
    {
      id: 'beauty6',
      title: 'Hada Labo Gokujyun Hyaluronic Lotion',
      price: 17.99,
      description: 'Super hydrating toner with multiple types of hyaluronic acid',
      images: ['https://jessikaarangomakeup.com/wp-content/uploads/2023/11/hada-labo-170ml.jpeg', 'https://kbeautystore.com/cdn/shop/files/IMG_4069.webp?v=1690659961'],
      category: 'beauty',
      subCategory: 'skincare-toner',
      rating: 4.8,
      reviews: 878,
      aliExpressLink: 'https://aliexpress.com/item/96',
      featured: true
    },
    {
      id: 'beauty7',
      title: 'SK-II Facial Treatment Essence',
      price: 99.99,
      description: 'Luxury facial treatment essence with PITERA™',
      images: ['https://www.sephora.com/productimages/sku/s1448612-main-zoom.jpg?imwidth=315', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9S6OHVqwcNrjCaPvmTKHBXhLdZ1TzeaZspg&s'],
      category: 'beauty',
      subCategory: 'skincare-essence',
      rating: 4.9,
      reviews: 1567,
      aliExpressLink: 'https://aliexpress.com/item/97',
      featured: true
    },
    // Adding next batch of 10 skincare products
    {
      id: 'beauty8',
      title: 'Sulwhasoo First Care Activating Serum',
      price: 89.99,
      description: 'Premium Korean serum with traditional herbal ingredients',
      images: ['https://static.wixstatic.com/media/57b89c_769ad8a0a14d4bb3b686102846da22a2~mv2.jpg/v1/fill/w_1000,h_552,al_c,q_85,usm_0.66_1.00_0.01/57b89c_769ad8a0a14d4bb3b686102846da22a2~mv2.jpg', 'https://http2.mlstatic.com/D_NQ_NP_633317-MCO74921831808_032024-O.webp'],
      category: 'beauty',
      subCategory: 'skincare-serum',
      rating: 4.9,
      reviews: 987,
      aliExpressLink: 'https://aliexpress.com/item/98',
      featured: true
    },
    {
      id: 'beauty9',
      title: 'Dr.Jart+ Ceramidin Cream',
      price: 34.99,
      description: 'Intensive moisturizing cream with ceramide complex',
      images: ['https://www.drjart.com/media/export/cms/products/1000x1000/dj_sku_H6MM01_1000x1000_1.jpg', 'https://http2.mlstatic.com/D_NQ_NP_972305-MLM74023748978_012024-O.webp'],
      category: 'beauty',
      subCategory: 'skincare-moisturizer',
      rating: 4.8,
      reviews: 756,
      aliExpressLink: 'https://aliexpress.com/item/99',
      featured: false
    },
    {
      id: 'beauty10',
      title: 'Banila Co Clean It Zero Cleansing Balm',
      price: 19.99,
      description: 'Award-winning makeup removing cleansing balm',
      images: ['https://i0.wp.com/rosavainilla.co/wp-content/uploads/2020/03/Clean_it_zero.jpg?fit=860%2C1075&ssl=1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxSxI9hh8dZsPOnerUWsXu0AIdyO1tjgVkaw&s'],
      category: 'beauty',
      subCategory: 'skincare-cleanser',
      rating: 4.7,
      reviews: 567,
      aliExpressLink: 'https://aliexpress.com/item/100',
      featured: false
    },
    // Adding next batch of 10 skincare products
    {
      id: 'beauty11',
      title: 'Missha Time Revolution Essence',
      price: 29.99,
      description: 'First treatment essence with fermented ingredients',
      images: ['https://misshaus.com/cdn/shop/products/20210414_Missha0051.jpg?v=1683910699', 'https://www.okareshop.com/cdn/shop/products/p6_1_651c708a-dada-4316-b145-dc324943e279.png?v=1573602285'],
      category: 'beauty',
      subCategory: 'skincare-essence',
      rating: 4.7,
      reviews: 678,
      aliExpressLink: 'https://aliexpress.com/item/101',
      featured: false
    },
    {
      id: 'beauty12',
      title: 'Klairs Supple Preparation Toner',
      price: 18.99,
      description: 'Hydrating and soothing facial toner',
      images: ['https://i0.wp.com/rosavainilla.co/wp-content/uploads/2024/09/61K2fOs4y-S._AC_UF10001000_QL80_.jpg?fit=510%2C637&ssl=1', 'https://static.beautytocare.com/cdn-cgi/image/width=1600,height=1600,f=auto/media/catalog/product//d/e/dear-klairs-supple-preparation-facial-toner-180ml.jpg'],
      category: 'beauty',
      subCategory: 'skincare-toner',
      rating: 4.6,
      reviews: 543,
      aliExpressLink: 'https://aliexpress.com/item/102',
      featured: false
    },
    {
      id: 'beauty13',
      title: 'Purito Centella Green Level Serum',
      price: 19.99,
      description: 'Calming serum with Centella Asiatica extract',
      images: ['https://amarantashop.com.co/cdn/shop/files/SerumCentellagreenlevelBuffet60ML.png?v=1713919066&width=1500', 'https://www.kiyoko.com/cdn/shop/products/purito-centella-green-level-buffet-serum.jpg?v=1669149714'],
      category: 'beauty',
      subCategory: 'skincare-serum',
      rating: 4.8,
      reviews: 432,
      aliExpressLink: 'https://aliexpress.com/item/103',
      featured: true
    },
    {
      id: 'beauty14',
      title: 'I\'m From Mugwort Mask',
      price: 25.99,
      description: 'Purifying clay mask with mugwort extract',
      images: ['https://www.tonic15.com/cdn/shop/files/I_MFROMMugwortMasklifestyle_800x.jpg?v=1718840553', 'https://m.media-amazon.com/images/I/610qAtLebHL.jpg'],
      category: 'beauty',
      subCategory: 'skincare-mask',
      rating: 4.7,
      reviews: 345,
      aliExpressLink: 'https://aliexpress.com/item/104',
      featured: false
    },
    {
      id: 'beauty15',
      title: 'Beauty of Joseon Glow Serum',
      price: 16.99,
      description: 'Brightening serum with propolis and niacinamide',
      images: ['https://chokchokskin.co/cdn/shop/products/Glow-Serum--Proplis-Niacinamide-2_2000x_b5623016-b9e1-4036-a5c6-2860ff12fa55_1080x.jpg?v=1676418483', 'https://m.media-amazon.com/images/I/71Azno56mDL.jpg'],
      category: 'beauty',
      subCategory: 'skincare-serum',
      rating: 4.9,
      reviews: 567,
      aliExpressLink: 'https://aliexpress.com/item/105',
      featured: true
    },
    {
      id: 'beauty16',
      title: 'Pyunkang Yul Essence Toner',
      price: 12.99,
      description: 'Minimal ingredient hydrating toner',
      images: ['https://i0.wp.com/rosavainilla.co/wp-content/uploads/2020/10/Pyunkang_Yul_Essence_Toner_Kbeauty_grande_png_1800x1800.webp?fit=600%2C600&ssl=1', 'https://cdn.shopify.com/s/files/1/0403/8200/5401/files/Pyunkang_Yul_Essence_Toner_3.jpg?v=1663861990'],
      category: 'beauty',
      subCategory: 'skincare-toner',
      rating: 4.5,
      reviews: 234,
      aliExpressLink: 'https://aliexpress.com/item/106',
      featured: false
    },
    {
      id: 'beauty17',
      title: 'Cosrx Low pH Cleanser',
      price: 11.99,
      description: 'Gentle morning cleanser with low pH formula',
      images: ['https://sokoglam.com/cdn/shop/products/2.7-Soko-Glam-PDP-Image-COSRX-Low-pH-Good-Morning-Gel-Cleanser-Korean-Skincare-Lifestyle-Texture_1_860x.jpg?v=1644936215', 'https://amarantashop.com.co/cdn/shop/files/LimpiadorengelLowpHGoodMorning150ML.png?v=1713918783&width=1500'],
      category: 'beauty',
      subCategory: 'skincare-cleanser',
      rating: 4.6,
      reviews: 789,
      aliExpressLink: 'https://aliexpress.com/item/107',
      featured: false
    },
    {
      id: 'beauty18',
      title: 'Isntree Hyaluronic Acid Toner',
      price: 15.99,
      description: 'Multi-weight hyaluronic acid hydrating toner',
      images: ['https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/isn/isn51753/y/48.jpg', 'https://www.skincupid.ca/cdn/shop/files/ISNTREEHyaluronicAcidToner_200ml_3.png?v=1728906259'],
      category: 'beauty',
      subCategory: 'skincare-toner',
      rating: 4.7,
      reviews: 432,
      aliExpressLink: 'https://aliexpress.com/item/108',
      featured: false
    },
    {
      id: 'beauty19',
      title: 'Benton Snail Bee Essence',
      price: 17.99,
      description: 'Snail mucin and bee venom essence',
      images: ['https://pleeacosmetics.com/cdn/shop/products/benton-snail-Bee-high-content-essence-pleea-cosmetics3_1800x1800.jpg?v=1628617558', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlknmLOu__awccM9OofJb2YbmoG3ZKOHNDBA&s'],
      category: 'beauty',
      subCategory: 'skincare-essence',
      rating: 4.8,
      reviews: 567,
      aliExpressLink: 'https://aliexpress.com/item/109',
      featured: true
    },
    {
      id: 'beauty20',
      title: 'Round Lab Dokdo Toner',
      price: 16.99,
      description: 'Mineral-rich toner with deep sea water',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS1-gBeZwRmNvuSu8OIje-w6kauJgNjWlmTw&s', 'https://chokchokskin.co/cdn/shop/files/Round-Lab_-1025-DOKDO-TONER-01_1024x1024.jpg?v=1695656600'],
      category: 'beauty',
      subCategory: 'skincare-toner',
      rating: 4.6,
      reviews: 345,
      aliExpressLink: 'https://aliexpress.com/item/110',
      featured: false
    },
    // Adding makeup products (21-30)
    {
      id: 'beauty21',
      title: '3CE Velvet Lip Tint',
      price: 15.99,
      description: 'Matte finish Korean lip tint with long-lasting formula',
      images: ['https://http2.mlstatic.com/D_NQ_NP_658379-MCO54339513284_032023-O.webp', 'https://d3i908zd4kzakt.cloudfront.net/data/editor/1903/ca7a0778092eb0de88f5440e1ff71dec_1553498879_9368.jpg'],
      category: 'beauty',
      subCategory: 'makeup-lips',
      rating: 4.8,
      reviews: 567,
      aliExpressLink: 'https://aliexpress.com/item/111',
      featured: true
    },
    {
      id: 'beauty22',
      title: 'Etude House Drawing Eyebrow Pencil',
      price: 4.99,
      description: 'Precise eyebrow pencil with spoolie brush',
      images: ['https://harumiglobal.com/cdn/shop/files/EtudeHouseDrawingSlimEyebrow01.webp?v=1683281848&width=1445', 'https://pearlandbubbles.wordpress.com/wp-content/uploads/2020/04/brow-shades.jpg?w=600'],
      category: 'beauty',
      subCategory: 'makeup-eyes',
      rating: 4.6,
      reviews: 789,
      aliExpressLink: 'https://aliexpress.com/item/112',
      featured: false
    },
    {
      id: 'beauty23',
      title: 'Peripera Ink Velvet Lip Tint',
      price: 9.99,
      description: 'Highly pigmented lip tint with soft matte finish',
      images: ['https://harumiglobal.com/cdn/shop/files/PeriperaInkVelvet20_f655b337-bef8-4f8b-8392-09d17a6f3e15.webp?v=1682873377&width=1445', 'https://harumiglobal.com/cdn/shop/files/PeriperaInkVelvet23.webp?v=1682857844&width=1445'],
      category: 'beauty',
      subCategory: 'makeup-lips',
      rating: 4.7,
      reviews: 654,
      aliExpressLink: 'https://aliexpress.com/item/113',
      featured: true
    },
    {
      id: 'beauty24',
      title: 'Missha Perfect Cover BB Cream',
      price: 12.99,
      description: 'High coverage BB cream with SPF42 PA+++',
      images: ['https://chokchokskin.co/cdn/shop/products/Missha_MPerfectCoveringBBCreamSPF42PA_31_1080x.jpg?v=1663903608', 'https://static.beautytocare.com/cdn-cgi/image/width=1600,height=1600,f=auto/media/catalog/product//m/i/missha-m-perfect-cover-bb-cream-spf42-pa_2.jpg'],
      category: 'beauty',
      subCategory: 'makeup-face',
      rating: 4.8,
      reviews: 892,
      aliExpressLink: 'https://aliexpress.com/item/114',
      featured: true
    },
    {
      id: 'beauty25',
      title: 'Heroine Make Long & Curl Mascara',
      price: 13.99,
      description: 'Waterproof Japanese mascara for long-lasting curl',
      images: ['https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/kss/kss03698/y/39.jpg', 'https://beautybar.com.ph/cdn/shop/products/1oa5RyvyeQrnkh0QiFFdZemDF0cusvW_f_2048x.jpg?v=1685008443'],
      category: 'beauty',
      subCategory: 'makeup-eyes',
      rating: 4.9,
      reviews: 765,
      aliExpressLink: 'https://aliexpress.com/item/115',
      featured: true
    },
    {
      id: 'beauty26',
      title: 'Innisfree No Sebum Mineral Powder',
      price: 8.99,
      description: 'Oil control loose powder with mint extract',
      images: ['https://cdnx.jumpseller.com/kalon-skin-bar/image/45664615/resize/1200/1200?1708366975', 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/035dad4b-b021-459c-9549-fee8a474d49c.__CR0,0,1200,900_PT0_SX600_V1___.jpg'],
      category: 'beauty',
      subCategory: 'makeup-face',
      rating: 4.7,
      reviews: 543,
      aliExpressLink: 'https://aliexpress.com/item/116',
      featured: false
    },
    {
      id: 'beauty27',
      title: 'CLIO Kill Black Liquid Eyeliner',
      price: 11.99,
      description: 'Waterproof brush liner with intense black pigment',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-WWjcLc8vpWoGyjvVu-CVj8VHYBAGsxlVA&s', 'https://m.media-amazon.com/images/I/51k-33MVl+L._AC_UF1000,1000_QL80_.jpg'],
      category: 'beauty',
      subCategory: 'makeup-eyes',
      rating: 4.8,
      reviews: 678,
      aliExpressLink: 'https://aliexpress.com/item/117',
      featured: true
    },
    {
      id: 'beauty28',
      title: 'Holika Holika Heart Crush Blush',
      price: 7.99,
      description: 'Soft, buildable powder blush in heart packaging',
      images: ['https://i.ytimg.com/vi/iP_EYuxNk0s/sddefault.jpg', 'https://i.ebayimg.com/images/g/0eEAAOSwcBpdwjYo/s-l1200.jpg'],
      category: 'beauty',
      subCategory: 'makeup-face',
      rating: 4.5,
      reviews: 432,
      aliExpressLink: 'https://aliexpress.com/item/118',
      featured: false
    },
    {
      id: 'beauty29',
      title: 'Etude House Proof 10 Eye Primer',
      price: 6.99,
      description: 'Long-lasting eyeshadow primer for vibrant color',
      images: ['https://m.media-amazon.com/images/I/41U8u8K84DL.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiTtVwBfiCrft8sTpyJE0oRc_xaLg67CtOeg&s'],
      category: 'beauty',
      subCategory: 'makeup-eyes',
      rating: 4.6,
      reviews: 345,
      aliExpressLink: 'https://aliexpress.com/item/119',
      featured: false
    },
    {
      id: 'beauty30',
      title: 'BBIA Last Velvet Lip Tint',
      price: 8.99,
      description: 'Velvet finish lip tint with intense color payoff',
      images: ['https://http2.mlstatic.com/D_NQ_NP_666609-MCO74984146441_032024-O.webp', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdS_EqqqkZoqjmB0OmbvnEG3af7ZTlD0XeCw&s'],
      category: 'beauty',
      subCategory: 'makeup-lips',
      rating: 4.7,
      reviews: 567,
      aliExpressLink: 'https://aliexpress.com/item/120',
      featured: true
    },
    // Adding hair care products (27-46)
    {
      id: 'beauty31',
      title: 'Lador Damage Protector Acid Shampoo',
      price: 18.99,
      description: 'pH balancing shampoo for damaged hair with protein complex',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiwVTLtq7-Bh2jQY4jlMJ6gmx9TxpkMQ16hA&s', 'https://rossi.lt/cdn/shop/files/LadorDamageProtectorAcidShampoo.webp?v=1722353053&width=1500'],
      category: 'beauty',
      subCategory: 'haircare-shampoo',
      rating: 4.7,
      reviews: 432,
      aliExpressLink: 'https://aliexpress.com/item/117',
      featured: false
    },
    {
      id: 'beauty32',
      title: 'Mise En Scene Perfect Repair Serum',
      price: 12.99,
      description: 'Hair repair serum with seven oils complex',
      images: ['https://us.althea.kr/cdn/shop/products/1352466_1_500_9e76d86c-8a02-4c63-b2ad-ccdaecad0fd4_800x.jpg?v=1663736259', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcy8YGPDmc65R6djStrBDQMDRkEnN6OZDZRg&s'],
      category: 'beauty',
      subCategory: 'haircare-treatment',
      rating: 4.8,
      reviews: 567,
      aliExpressLink: 'https://aliexpress.com/item/118',
      featured: true
    },
    // Adding next batch of 10 hair care products (31-40)
    {
      id: 'beauty33',
      title: 'CP-1 Premium Silk Treatment',
      price: 16.99,
      description: 'Intensive protein treatment for damaged hair',
      images: ['https://m.media-amazon.com/images/I/71Px7WJIRLL._AC_UF1000,1000_QL80_.jpg', 'https://patchi.lv/cdn/shop/products/060d2c1a1ce669fdf872418d9a0de947_1570467994_1200x.jpg?v=1723636105'],
      category: 'beauty',
      subCategory: 'haircare-treatment',
      rating: 4.7,
      reviews: 432,
      aliExpressLink: 'https://aliexpress.com/item/121',
      featured: false
    },
    {
      id: 'beauty34',
      title: 'Pyunkang Yul Hair Loss Control Shampoo',
      price: 19.99,
      description: 'Strengthening shampoo with herbal extracts',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx2wZsLNaGwv9wfBOTFGKRuuhCUjFg4WFaRg&s', 'https://beautywithin.com/cdn/shop/files/image_9029beab-428d-4b41-87bb-adb93b64a34e_1000x.jpg?v=1682705908'],
      category: 'beauty',
      subCategory: 'haircare-shampoo',
      rating: 4.6,
      reviews: 345,
      aliExpressLink: 'https://aliexpress.com/item/122',
      featured: false
    },
    {
      id: 'beauty35',
      title: 'Elizavecca CER-100 Hair Protein Treatment',
      price: 14.99,
      description: 'Collagen coating protein treatment for hair',
      images: ['https://pleeacosmetics.com/cdn/shop/files/Elizavecca_-CER-100-Collagen-Ceramide-Coating-Protein-Treatment2_1024x1024.png?v=1698509787', 'https://pleeacosmetics.com/cdn/shop/files/Elizavecca_-CER-100-Collagen-Coating-Protein-Ion-Injection2_1800x1800.png?v=1715897792'],
      category: 'beauty',
      subCategory: 'haircare-treatment',
      rating: 4.8,
      reviews: 567,
      aliExpressLink: 'https://aliexpress.com/item/123',
      featured: true
    },
    {
      id: 'beauty36',
      title: 'Ryo Hair Loss Care Essence',
      price: 22.99,
      description: 'Scalp treatment essence with ginseng extract',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPVicvX8_TYNd3tm1xCp6s1jQp2jXB1TurdA&s', 'https://viktoriyabeauty.com/cdn/shop/products/10_c99b0426-aaf4-4577-98c0-212f13c865c8_900x900.png?v=1637728838'],
      category: 'beauty',
      subCategory: 'haircare-treatment',
      rating: 4.7,
      reviews: 423,
      aliExpressLink: 'https://aliexpress.com/item/124',
      featured: false
    },
    {
      id: 'beauty37',
      title: 'Kundal Honey & Macadamia Shampoo',
      price: 17.99,
      description: 'Moisturizing shampoo with natural extracts',
      images: ['https://kundal.us/cdn/shop/files/1_732f3c26-f58d-41d2-bc06-baa727eb4e63_1600x.png?v=1723508515', 'https://www.skincupid.ca/cdn/shop/files/Kundal-Honey_Macadamia_Cherry_Blossom_Shampoo.jpg?v=1728903401'],
      category: 'beauty',
      subCategory: 'haircare-shampoo',
      rating: 4.9,
      reviews: 678,
      aliExpressLink: 'https://aliexpress.com/item/125',
      featured: true
    },
    {
      id: 'beauty38',
      title: 'Mise En Scene Perfect Serum Original',
      price: 11.99,
      description: 'Lightweight hair serum for shine and smoothness',
      images: ['https://m.media-amazon.com/images/I/51N0lGTZ7QL.jpg', 'https://http2.mlstatic.com/D_NQ_NP_647202-MCO53866123452_022023-O.webp'],
      category: 'beauty',
      subCategory: 'haircare-treatment',
      rating: 4.6,
      reviews: 543,
      aliExpressLink: 'https://aliexpress.com/item/126',
      featured: false
    },
    {
      id: 'beauty39',
      title: 'Moremo Water Treatment Miracle 10',
      price: 25.99,
      description: 'Deep conditioning treatment for dry hair',
      images: ['https://moremo.com/cdn/shop/products/water10.jpg?v=1659090872', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd1nnaDcmfomKjqn8aXGTmNI3JPeMkpf8nqQ&s'],
      category: 'beauty',
      subCategory: 'haircare-treatment',
      rating: 4.8,
      reviews: 432,
      aliExpressLink: 'https://aliexpress.com/item/127',
      featured: true
    },
    {
      id: 'beauty40',
      title: 'La`dor Tea Tree Scalp Clinic Hair Pack',
      price: 20.99,
      description: 'Scalp care treatment with tea tree oil',
      images: ['https://glowid.se/cdn/shop/products/TEATREESCALPCLINICHAIRPACK.jpg?v=1680756961', 'https://m.media-amazon.com/images/I/71gwm-X66kL._AC_UF1000,1000_QL80_.jpg'],
      category: 'beauty',
      subCategory: 'haircare-treatment',
      rating: 4.7,
      reviews: 345,
      aliExpressLink: 'https://aliexpress.com/item/128',
      featured: false
    },
    {
      id: 'beauty41',
      title: 'Aromatica Rosemary Hair Thickening Conditioner',
      price: 18.99,
      description: 'Volume-boosting conditioner with rosemary',
      images: ['https://m.media-amazon.com/images/I/61oUPp2MI8L.jpg', 'https://orionxoxo.lk/cdn/shop/files/aromatica-rosemary-hair-thickening-conditioner-180ml-skin-care-aromatica-orion-xo-sri-lanka-525534.jpg?v=1720093832&width=1500'],
      category: 'beauty',
      subCategory: 'haircare-conditioner',
      rating: 4.5,
      reviews: 234,
      aliExpressLink: 'https://aliexpress.com/item/129',
      featured: false
    },
    {
      id: 'beauty42',
      title: 'Daeng Gi Meo Ri Ki Gold Energizing Shampoo',
      price: 23.99,
      description: 'Premium herbal shampoo for hair growth',
      images: ['https://http2.mlstatic.com/D_Q_NP_937868-MLU74275295709_012024-O.webp', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR2WYrt1zi3xxzbcFCOIMyUgUHcZkJJPBA4g&s'],
      category: 'beauty',
      subCategory: 'haircare-shampoo',
      rating: 4.8,
      reviews: 567,
      aliExpressLink: 'https://aliexpress.com/item/130',
      featured: true
    },
    // Adding body care products (41-50)
    {
      id: 'beauty43',
      title: 'Illiyoon Ceramide Ato Concentrate Cream',
      price: 18.99,
      description: 'Intensive moisturizing body cream with ceramide complex',
      images: ['https://beautyhouse.co/wp-content/uploads/2023/03/illiyoon-ceramide-ato-concentrate-cream-.jpg', 'https://http2.mlstatic.com/D_NQ_NP_708085-MLU77629475694_072024-O.webp'],
      category: 'beauty',
      subCategory: 'bodycare-moisturizer',
      rating: 4.8,
      reviews: 567,
      aliExpressLink: 'https://aliexpress.com/item/131',
      featured: true
    },
    {
      id: 'beauty44',
      title: 'Pyunkang Yul Ato Body Wash',
      price: 16.99,
      description: 'Gentle body cleanser for sensitive skin',
      images: ['https://m.media-amazon.com/images/I/511J00xwZiL.jpg', 'https://skinroute.com/wp-content/uploads/2024/05/Pyunkang-Yul-ATO-Wash-Shampoo-Blue-Label_2.webp'],
      category: 'beauty',
      subCategory: 'bodycare-cleanser',
      rating: 4.6,
      reviews: 345,
      aliExpressLink: 'https://aliexpress.com/item/132',
      featured: false
    },
    {
      id: 'beauty45',
      title: 'Tonymoly Pure Eco Aloe Gel',
      price: 9.99,
      description: 'Soothing aloe vera gel for body and face',
      images: ['https://www.belieef.com/image/cache/main/tonymoly/tony_203369-650x650_0.1.jpg', 'https://www.tonymolycolombia.com/cdn/shop/files/333_678x.jpg?v=1714769139'],
      category: 'beauty',
      subCategory: 'bodycare-treatment',
      rating: 4.7,
      reviews: 678,
      aliExpressLink: 'https://aliexpress.com/item/133',
      featured: false
    },
    {
      id: 'beauty46',
      title: 'Holika Holika Aloe Body Lotion',
      price: 14.99,
      description: 'Hydrating body lotion with aloe vera extract',
      images: ['https://salmonhouse.com.co/cdn/shop/products/2022-03-30_2_grande.png?v=1648657598', 'https://http2.mlstatic.com/D_Q_NP_620146-MLU75114499999_032024-O.webp'],
      category: 'beauty',
      subCategory: 'bodycare-moisturizer',
      rating: 4.5,
      reviews: 234,
      aliExpressLink: 'https://aliexpress.com/item/134',
      featured: false
    },
    {
      id: 'beauty47',
      title: 'Nature Republic Shea Butter Body Cream',
      price: 12.99,
      description: 'Rich body cream with shea butter for dry skin',
      images: ['https://m.media-amazon.com/images/I/71caDP3JILL.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrmfCOz8WTPwbAcA_OwEKlZsNnDc2KWcHB8A&s'],
      category: 'beauty',
      subCategory: 'bodycare-moisturizer',
      rating: 4.8,
      reviews: 456,
      aliExpressLink: 'https://aliexpress.com/item/135',
      featured: true
    },
    {
      id: 'beauty48',
      title: 'A\'Pieu Milk Body Scrub',
      price: 11.99,
      description: 'Gentle exfoliating body scrub with milk protein',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWabVVEjdVJ_dG39Rd6s-K4PomSBzAB8hQxw&s', 'https://i00.eu/img/784/1600x1600/bwi628wf/3439.jpg'],
      category: 'beauty',
      subCategory: 'bodycare-scrub',
      rating: 4.6,
      reviews: 321,
      aliExpressLink: 'https://aliexpress.com/item/136',
      featured: false
    },
    {
      id: 'beauty49',
      title: 'Etude House Hand Bouquet Rich Butter Hand Cream',
      price: 7.99,
      description: 'Nourishing hand cream with floral scent',
      images: ['https://www.korendy.com/cdn/shop/products/20151027174724279.jpg?v=1480251243', 'https://kallos.co/cdn/shop/products/kem-duong-tay-etude-house-hand-bouquet-rich-butter-hand-and-heel-cream-kallos-vietnam-3.jpg?v=1676050067'],
      category: 'beauty',
      subCategory: 'bodycare-hand',
      rating: 4.7,
      reviews: 543,
      aliExpressLink: 'https://aliexpress.com/item/137',
      featured: false
    },
    {
      id: 'beauty50',
      title: 'Missha Total Ceramide Body Lotion',
      price: 19.99,
      description: 'Ceramide-enriched body lotion for barrier repair',
      images: ['https://statics.promofarma.com/static/promofarma/prod/product_images/mr/GOCLM_es_ES_0.jpeg', 'https://koreanskincare.be/cdn/shop/products/Near_Skin_Total_Ceramide_Cream_1.jpg?v=1590258745'],
      category: 'beauty',
      subCategory: 'bodycare-moisturizer',
      rating: 4.9,
      reviews: 678,
      aliExpressLink: 'https://aliexpress.com/item/138',
      featured: true
    },
    {
      id: 'beauty51',
      title: 'The Face Shop Rice Water Bright Body Lotion',
      price: 15.99,
      description: 'Brightening body lotion with rice extract',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZcW500vYsMnrRg-ecKABAPUsiE_-9l427kQ&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtsEkvQ0K3s9Q7bxN1S9J7T-nIEiavKsoUQ&s'],
      category: 'beauty',
      subCategory: 'bodycare-moisturizer',
      rating: 4.7,
      reviews: 432,
      aliExpressLink: 'https://aliexpress.com/item/139',
      featured: false
    },
    {
      id: 'beauty52',
      title: 'Innisfree Jeju Volcanic Body Scrub',
      price: 13.99,
      description: 'Deep cleansing body scrub with volcanic clusters',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKc5HWx8tAEbDyntVQa4LylXS_VztHYiStGg&s', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmisumicosmetics.com%2Fproducts%2Finnisfree-jeju-volcanic-pore-scrub-foam&psig=AOvVaw0wcclhUkfpqltDrVOjLWUZ&ust=1731119931776000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCODdrbbay4kDFQAAAAAdAAAAABAJ'],
      category: 'beauty',
      subCategory: 'bodycare-scrub',
      rating: 4.8,
      reviews: 567,
      aliExpressLink: 'https://aliexpress.com/item/140',
      featured: true
    }
  ];

  constructor() {
    // Bind all methods to ensure 'this' context is preserved
    this.getAllProducts = this.getAllProducts.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.getFeaturedProducts = this.getFeaturedProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.getProductsByCategory = this.getProductsByCategory.bind(this);
  }

  private getAllProducts(): Product[] {
    return [...this.mockCosplayProducts, ...this.mockWigs, ...this.mockLenses, ...this.mockBeautyProducts];
  }

  async searchProducts(
    query: string,
    category: 'cosplay' | 'beauty',
    page: number = 1,
    pageSize: number = 20
  ) {
    const allProducts = this.getAllProducts();
    const filteredProducts = allProducts.filter(product => {
      const matchesCategory = product.category === category;
      const matchesQuery = !query || 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      products: filteredProducts.slice(start, end),
      totalPages: Math.ceil(filteredProducts.length / pageSize),
      currentPage: page
    };
  }

  async getFeaturedProducts() {
    const allProducts = this.getAllProducts();
    const featuredProducts = allProducts.filter(p => p.featured);
    
    // Separate products by category and subcategory
    const beautyProducts = featuredProducts.filter(p => p.category === 'beauty');
    const wigs = featuredProducts.filter(p => p.category === 'cosplay' && p.subCategory === 'wig');
    const lenses = featuredProducts.filter(p => p.category === 'cosplay' && p.subCategory === 'lens');
    
    // Sort each category by rating
    const sortedBeauty = beautyProducts.sort((a, b) => b.rating - a.rating);
    const sortedWigs = wigs.sort((a, b) => b.rating - a.rating);
    const sortedLenses = lenses.sort((a, b) => b.rating - a.rating);
    
    // Take 9 beauty products, 1 wig, and 1 lens
    const selectedBeauty = sortedBeauty.slice(0, 9);
    const selectedWig = sortedWigs.slice(0, 1);
    const selectedLens = sortedLenses.slice(0, 1);
    
    // Combine and shuffle slightly to avoid same order every time
    return [...selectedBeauty, ...selectedWig, ...selectedLens]
      .sort(() => Math.random() - 0.5);
  }

  async getProductById(id: string) {
    const allProducts = this.getAllProducts();
    return allProducts.find(p => p.id === id) || allProducts[0];
  }

  async getProductsByCategory(category: 'cosplay' | 'beauty', page: number = 1) {
    const allProducts = this.getAllProducts();
    const filteredProducts = allProducts.filter(p => p.category === category);
    
    // If it's cosplay category, shuffle and ensure mix of products
    if (category === 'cosplay') {
      const costumes = filteredProducts.filter(p => !p.subCategory || p.subCategory === 'costume');
      const wigs = filteredProducts.filter(p => p.subCategory === 'wig');
      const lenses = filteredProducts.filter(p => p.subCategory === 'lens');
      
      // Shuffle each array
      const shuffledCostumes = costumes.sort(() => Math.random() - 0.5);
      const shuffledWigs = wigs.sort(() => Math.random() - 0.5);
      const shuffledLenses = lenses.sort(() => Math.random() - 0.5);
      
      // Take some from each category for first page
      const firstPageProducts = [
        ...shuffledWigs.slice(0, 3),  // 3 wigs
        ...shuffledLenses.slice(0, 2), // 2 lenses
        ...shuffledCostumes.slice(0, 15) // 15 costumes
      ].sort(() => Math.random() - 0.5); // Final shuffle
      
      // Rest of the products for other pages
      const remainingProducts = [
        ...shuffledCostumes.slice(15),
        ...shuffledWigs.slice(3),
        ...shuffledLenses.slice(2)
      ];
      
      const pageSize = 20;
      const start = (page - 1) * pageSize;
      const productsForPage = page === 1 ? firstPageProducts : remainingProducts.slice(start - 20, start - 20 + pageSize);
      
      return {
        products: productsForPage,
        totalPages: Math.ceil((remainingProducts.length + 20) / pageSize),
        currentPage: page
      };
    }
    
    // For beauty category, keep original pagination
    const pageSize = 20;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    
    return {
      products: filteredProducts.slice(start, end),
      totalPages: Math.ceil(filteredProducts.length / pageSize),
      currentPage: page
    };
  }
}

// Create a single instance to be used throughout the app
export const aliExpressService = new AliExpressService();