<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Seed real clothing categories and products.
     */
    public function run(): void
    {
        // ── 1. Categories ────────────────────────────────────────────────────────

        $categories = [
            ['name' => 'T-Shirts',           'slug' => 't-shirts',          'image' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80'],
            ['name' => 'Pantalons',           'slug' => 'pantalons',         'image' => 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80'],
            ['name' => 'Chemises',            'slug' => 'chemises',          'image' => 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80'],
            ['name' => 'Shorts',              'slug' => 'shorts',            'image' => 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&q=80'],
            ['name' => 'Ensembles',           'slug' => 'ensembles',         'image' => 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80'],
            ['name' => 'Sweats & Hoodies',    'slug' => 'sweats-hoodies',    'image' => 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80'],
            ['name' => 'Tenues Football',     'slug' => 'tenues-football',   'image' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80'],
        ];

        $createdCategories = [];
        foreach ($categories as $cat) {
            $createdCategories[$cat['slug']] = Category::firstOrCreate(
                ['slug' => $cat['slug']],
                ['name' => $cat['name'], 'image' => $cat['image'], 'parent_id' => null]
            );
        }

        // ── 2. Products ──────────────────────────────────────────────────────────

        $products = [

            // ─── T-SHIRTS ──────────────────────────────────────────────────────
            [
                'category' => 't-shirts',
                'name'     => 'T-Shirt Essentiel Blanc',
                'slug'     => 't-shirt-essentiel-blanc',
                'description' => 'Le classique intemporel de votre garde-robe. Fabriqué en coton 100% biologique, ce t-shirt offre un toucher doux et une coupe moderne légèrement ajustée. Idéal au quotidien, il se porte aussi bien seul qu\'en superposition. Disponible en blanc pur, il s\'associe à toutes vos tenues.',
                'price'    => 29.99,
                'stock'    => 80,
                'images'   => [
                    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
                    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80',
                ],
            ],
            [
                'category' => 't-shirts',
                'name'     => 'T-Shirt Graphique Streetwear',
                'slug'     => 't-shirt-graphique-streetwear',
                'description' => 'Exprimez votre personnalité avec ce t-shirt au design graphique audacieux inspiré de la culture urbaine. Coupe oversize tendance, col rond renforcé, impression DTG haute définition qui ne se délave pas au lavage. Un must-have pour le style streetwear.',
                'price'    => 44.99,
                'stock'    => 55,
                'images'   => [
                    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
                    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
                ],
            ],
            [
                'category' => 't-shirts',
                'name'     => 'T-Shirt Premium Col V Noir',
                'slug'     => 't-shirt-premium-col-v-noir',
                'description' => 'Élégance décontractée avec ce t-shirt col V en coton pima ultra-doux. Sa coupe slim valorise la silhouette sans trop la serrer. La teinte noire profonde résiste aux lavages répétés. Parfait pour une tenue casual chic du bureau au week-end.',
                'price'    => 39.99,
                'stock'    => 65,
                'images'   => [
                    'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600&q=80',
                    'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=600&q=80',
                ],
            ],
            [
                'category' => 't-shirts',
                'name'     => 'T-Shirt Tie-Dye Multicolore',
                'slug'     => 't-shirt-tie-dye-multicolore',
                'description' => 'Plongez dans un festival de couleurs avec ce t-shirt tie-dye fait à la main. Chaque pièce est unique grâce au processus de teinture artisanal. Coton épais 220g/m² pour une durabilité optimale. Apporte une touche de bonne humeur à n\'importe quelle tenue.',
                'price'    => 49.99,
                'stock'    => 30,
                'images'   => [
                    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80',
                    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80',
                ],
            ],

            // ─── PANTALONS ─────────────────────────────────────────────────────
            [
                'category' => 'pantalons',
                'name'     => 'Jean Slim Bleu Délavé',
                'slug'     => 'jean-slim-bleu-delave',
                'description' => 'Le jean slim incontournable dans un bleu délavé élégant. Fabriqué avec du denim stretch 98% coton / 2% élasthanne pour un confort maximal tout au long de la journée. Cinq poches classiques, fermeture à zip et bouton. Coupe moderne qui s\'adapte à toutes les morphologies.',
                'price'    => 79.99,
                'stock'    => 45,
                'images'   => [
                    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
                    'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80',
                ],
            ],
            [
                'category' => 'pantalons',
                'name'     => 'Pantalon Chino Beige',
                'slug'     => 'pantalon-chino-beige',
                'description' => 'Le pantalon chino beige, pilier du vestiaire masculin contemporain. Coupe droite légèrement effilée, tissu en coton twill doux et respirant. Idéal pour le bureau ou les sorties décontractées. S\'associe parfaitement avec une chemise ou un pull.',
                'price'    => 69.99,
                'stock'    => 50,
                'images'   => [
                    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
                    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
                ],
            ],
            [
                'category' => 'pantalons',
                'name'     => 'Jogging Cargo Kaki',
                'slug'     => 'jogging-cargo-kaki',
                'description' => 'Le pantalon cargo jogger parfait alliant style et fonctionnalité. Nombreuses poches zippées, taille élastique avec cordon de serrage, chevilles resserrées. En coton mélangé résistant. Parfait pour vos sorties casual, urban outdoor ou sports lifestyle.',
                'price'    => 64.99,
                'stock'    => 40,
                'images'   => [
                    'https://images.unsplash.com/photo-1519668752166-ebdbfe986c2a?w=600&q=80',
                    'https://images.unsplash.com/photo-1551854838-212c9a5ae0bb?w=600&q=80',
                ],
            ],

            // ─── CHEMISES ──────────────────────────────────────────────────────
            [
                'category' => 'chemises',
                'name'     => 'Chemise Oxford Blanche Classique',
                'slug'     => 'chemise-oxford-blanche-classique',
                'description' => 'La chemise Oxford blanche, symbole de l\'élégance intemporelle. Tissu Oxford 100% coton à la texture légèrement gaufrée, col boutonné, poignets à boutons. Coupe regular fit qui convient à toutes les morphologies. Portez-la rentrée ou sortie selon l\'occasion.',
                'price'    => 59.99,
                'stock'    => 60,
                'images'   => [
                    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
                    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
                ],
            ],
            [
                'category' => 'chemises',
                'name'     => 'Chemise Flanelle Carreau Automne',
                'slug'     => 'chemise-flanelle-carreau-automne',
                'description' => 'Emblème du style casual américain, cette chemise en flanelle douce à carreau rouge et noir vous habillera avec chaleur et style. Tissu brossé 100% coton, coupe décontractée, parfaite pour les journées fraîches. Se porte ouverte sur un t-shirt ou boutonnée.',
                'price'    => 54.99,
                'stock'    => 45,
                'images'   => [
                    'https://images.unsplash.com/photo-1609873814058-a8928924184a?w=600&q=80',
                    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80',
                ],
            ],
            [
                'category' => 'chemises',
                'name'     => 'Chemise Lin Été Rayée',
                'slug'     => 'chemise-lin-ete-rayee',
                'description' => 'Légère et respirante, cette chemise en lin rayé bleu marine et blanc est taillée pour l\'été. Le lin naturel garantit fraîcheur et confort par temps chaud. Coupe droite, manches longues retroussables. Idéale pour les vacances ou les journées estivales au bureau.',
                'price'    => 64.99,
                'stock'    => 35,
                'images'   => [
                    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80',
                    'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80',
                ],
            ],

            // ─── SHORTS ────────────────────────────────────────────────────────
            [
                'category' => 'shorts',
                'name'     => 'Short Bermuda Chino Kaki',
                'slug'     => 'short-bermuda-chino-kaki',
                'description' => 'Ce short bermuda en coton chino kaki est le compagnon idéal de vos étés. Coupe classique mi-cuisses, deux poches latérales et deux poches arrière. Tissu léger et respirant qui séchera vite. Alliez-le à un t-shirt ou une chemise pour un look décontracté réussi.',
                'price'    => 44.99,
                'stock'    => 55,
                'images'   => [
                    'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80',
                    'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=600&q=80',
                ],
            ],
            [
                'category' => 'shorts',
                'name'     => 'Short Sport Running Bleu Marine',
                'slug'     => 'short-sport-running-bleu-marine',
                'description' => 'Conçu pour la performance, ce short de running en tissu technique DryFit évacue la transpiration et sèche rapidement. Taille élastique avec cordon, poche zippée à l\'arrière, longueur optimale au-dessus du genou. Parfait pour le running, la salle de sport ou la plage.',
                'price'    => 39.99,
                'stock'    => 70,
                'images'   => [
                    'https://images.unsplash.com/photo-1530822847156-5df684ec5105?w=600&q=80',
                    'https://images.unsplash.com/photo-1539710977-27b97e2b7e3e?w=600&q=80',
                ],
            ],
            [
                'category' => 'shorts',
                'name'     => 'Short Jean Déchiré Destroy',
                'slug'     => 'short-jean-dechire-destroy',
                'description' => 'Pour un look rock et décalé, ce short en jean destroy affiche des déchirures soigneusement travaillées pour un effet authentique. Denim léger 100% coton, coupe droite. Un must-have de la saison chaude pour ceux qui osent le style edgy et assumé.',
                'price'    => 49.99,
                'stock'    => 40,
                'images'   => [
                    'https://images.unsplash.com/photo-1594938298603-c8148c4b4bc9?w=600&q=80',
                    'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80',
                ],
            ],

            // ─── ENSEMBLES ─────────────────────────────────────────────────────
            [
                'category' => 'ensembles',
                'name'     => 'Ensemble Jogging Premium Gris',
                'slug'     => 'ensemble-jogging-premium-gris',
                'description' => 'L\'ensemble jogging premium en molleton gris chiné incontournable. Hoodie avec poche kangourou et cordon assorti, pantalon jogger avec taille élastique et chevilles resserrées. Coton gratté intérieur ultra-doux pour un confort absolu. Parfait pour le sport comme pour la détente.',
                'price'    => 99.99,
                'stock'    => 35,
                'images'   => [
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
                    'https://images.unsplash.com/photo-1613063781686-eb7e3f6b1c0a?w=600&q=80',
                ],
            ],
            [
                'category' => 'ensembles',
                'name'     => 'Ensemble Costume Casual Bleu Nuit',
                'slug'     => 'ensemble-costume-casual-bleu-nuit',
                'description' => 'Revisitez le costume avec cet ensemble veste et pantalon en tissu jersey stretch bleu nuit. La veste structurée se porte avec ou sans cravate ; le pantalon à pinces offre une coupe impeccable. Idéal pour les occasions semi-formelles où vous voulez allier style et confort.',
                'price'    => 149.99,
                'stock'    => 20,
                'images'   => [
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
                    'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80',
                ],
            ],
            [
                'category' => 'ensembles',
                'name'     => 'Ensemble Survêtement Sport Noir',
                'slug'     => 'ensemble-survetement-sport-noir',
                'description' => 'Ensemble survêtement sport deux pièces en tissu technique respirant. La veste légère à fermeture éclair intégrale avec deux poches zippées s\'accompagne d\'un pantalon fuselé avec bandes latérales contrastantes. Séchage rapide, léger, parfait pour vos entraînements.',
                'price'    => 89.99,
                'stock'    => 45,
                'images'   => [
                    'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=600&q=80',
                    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80',
                ],
            ],

            // ─── SWEATS & HOODIES ──────────────────────────────────────────────
            [
                'category' => 'sweats-hoodies',
                'name'     => 'Hoodie Oversize Noir Essentiel',
                'slug'     => 'hoodie-oversize-noir-essentiel',
                'description' => 'Le hoodie oversize noir, pièce phare du streetwear contemporain. En molleton épais 340g/m² 100% coton gratté intérieur, il offre une chaleur exceptionnelle. Grand capuche double épaisseur, poche kangourou profonde, manches longues avec poignets côtelés. Un basique qui habille toutes les morphologies.',
                'price'    => 74.99,
                'stock'    => 60,
                'images'   => [
                    'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
                    'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80',
                ],
            ],
            [
                'category' => 'sweats-hoodies',
                'name'     => 'Sweat Col Rond Vert Olive',
                'slug'     => 'sweat-col-rond-vert-olive',
                'description' => 'Ce sweat col rond en vert olive est une pièce polyvalente pour la mi-saison. Molleton doux avec intérieur légèrement gratté, coupe droite, bords côtelés aux manches et à la taille. Sa couleur tendance s\'accorde facilement avec des jeans, des chinos ou des joggings.',
                'price'    => 59.99,
                'stock'    => 50,
                'images'   => [
                    'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80',
                    'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=600&q=80',
                ],
            ],
            [
                'category' => 'sweats-hoodies',
                'name'     => 'Zip-Up Hoodie Gris Chiné',
                'slug'     => 'zip-up-hoodie-gris-chine',
                'description' => 'Le zip hoodie gris chiné, vêtement de transition par excellence. Fermeture éclair YKK complète, deux poches zippées latérales, capuche avec lacets. Tissu cottony fleece 300g/m², respirant et chaud à la fois. Se porte ouvert sur un t-shirt ou fermé comme veste légère.',
                'price'    => 79.99,
                'stock'    => 45,
                'images'   => [
                    'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&q=80',
                    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
                ],
            ],

            // ─── TENUES FOOTBALL ───────────────────────────────────────────────
            [
                'category' => 'tenues-football',
                'name'     => 'Maillot Football Domicile Rouge',
                'slug'     => 'maillot-football-domicile-rouge',
                'description' => 'Maillot de football performance en tissu Dri-FIT 100% polyester recyclé. Technologie d\'évacuation de la transpiration, coupe athlétique ergonomique, col rond renforcé. Design bandes latérales contrastantes. Numéro et nom personnalisables. Idéal pour les matchs comme pour le style casual.',
                'price'    => 69.99,
                'stock'    => 50,
                'images'   => [
                    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
                    'https://images.unsplash.com/photo-1576012484456-c8f4b4e70d3c?w=600&q=80',
                ],
            ],
            [
                'category' => 'tenues-football',
                'name'     => 'Kit Football Complet Bleu & Blanc',
                'slug'     => 'kit-football-complet-bleu-blanc',
                'description' => 'Le kit football deux pièces complet : maillot + short assortis. Maillot en polyester microfibre ultra-léger avec technologie séchage rapide, short avec taille élastique et bords cousus. Design bicolore bleu ciel et blanc inspiré des grandes équipes nationales. Parfait pour les entraînements et compétitions.',
                'price'    => 99.99,
                'stock'    => 35,
                'images'   => [
                    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',
                    'https://images.unsplash.com/photo-1580974928064-f0aeef70895a?w=600&q=80',
                ],
            ],
            [
                'category' => 'tenues-football',
                'name'     => 'Short Football Pro Noir',
                'slug'     => 'short-football-pro-noir',
                'description' => 'Short de football professionnel en tissu technique stretch 4 directions. Taille élastique avec cordon intégré, poches laterales filet, longueur genou pour une liberté de mouvement maximale. Technologie anti-frottement pour les sprints et actions répétées. Lavable en machine, conserve sa forme.',
                'price'    => 39.99,
                'stock'    => 60,
                'images'   => [
                    'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&q=80',
                    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80',
                ],
            ],
            [
                'category' => 'tenues-football',
                'name'     => 'Veste Training Football Zippée',
                'slug'     => 'veste-training-football-zippee',
                'description' => 'Veste d\'entraînement football à fermeture éclair complète. Col montant protège-nuque, tissu technique coupe-vent léger, deux poches avant zippées, bandes réfléchissantes sur les épaules pour la visibilité. Parfaite pour l\'échauffement, le banc de touche ou le style sportswear quotidien.',
                'price'    => 79.99,
                'stock'    => 30,
                'images'   => [
                    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
                    'https://images.unsplash.com/photo-1529946825458-e4558af37d03?w=600&q=80',
                ],
            ],
        ];

        // ── 3. Insert Products ───────────────────────────────────────────────────

        foreach ($products as $data) {
            $categorySlug = $data['category'];
            $category = $createdCategories[$categorySlug] ?? null;

            if (!$category) {
                $this->command->warn("Catégorie introuvable : {$categorySlug}");
                continue;
            }

            Product::updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'category_id' => $category->id,
                    'name'        => $data['name'],
                    'description' => $data['description'],
                    'price'       => $data['price'],
                    'stock'       => $data['stock'],
                    'images'      => $data['images'],
                    'is_active'   => true,
                ]
            );
        }

        $this->command->info('✅ ' . count($products) . ' produits insérés avec succès dans ' . count($categories) . ' catégories !');
    }
}
