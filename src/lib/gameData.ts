import { GameMode } from "@/types/game";

export const SECRET_WORDS = [
  // Objetos cotidianos
  "Geladeira", "Guarda-chuva", "Mochila", "Colchão", "Ventilador", "Escova de dente",
  "Garrafa térmica", "Travesseiro", "Relógio", "Óculos", "Carteira", "Chave",
  "Caneta", "Tesoura", "Espelho", "Vela", "Corda", "Régua", "Mapa", "Bússola",
  // Animais
  "Elefante", "Golfinho", "Pinguim", "Cobra", "Águia", "Tartaruga", "Polvo",
  "Camelo", "Gorila", "Flamingo", "Urso polar", "Tubarão", "Panda", "Leão",
  "Tigre", "Baleia", "Coruja", "Raposa", "Lobo", "Macaco",
  // Alimentos
  "Pizza", "Sorvete", "Chocolate", "Hambúrguer", "Sushi", "Pastel", "Coxinha",
  "Macarrão", "Queijo", "Mel", "Pipoca", "Tapioca", "Bolo", "Brigadeiro",
  "Mousse", "Churros", "Croissant", "Ramen", "Lasanha", "Paçoca",
  // Tecnologia
  "Computador", "Celular", "Fone de ouvido", "Câmera", "Drone", "Impressora",
  "Teclado", "Mouse", "Tablet", "Microfone", "Alto-falante", "Carregador",
  // Natureza
  "Vulcão", "Cachoeira", "Deserto", "Iceberg", "Floresta", "Coral",
  "Furacão", "Aurora boreal", "Gêiser", "Caverna", "Penhasco", "Lago",
  "Nevoeiro", "Avalanche", "Redemoinho", "Relâmpago", "Arco-íris",
  // Transporte
  "Submarino", "Foguete", "Helicóptero", "Navio", "Trem bala", "Teleférico",
  "Moto aquática", "Planador", "Zeppelin", "Bicicleta", "Trator", "Ambulância",
  // Lugares
  "Biblioteca", "Castelo", "Farol", "Pirâmide", "Iglu", "Bunker",
  "Observatório", "Labirinto", "Cemitério", "Aquário", "Museu", "Circo",
  // Esportes e lazer
  "Paraquedas", "Skate", "Escalada", "Mergulho", "Arco e flecha", "Xadrez",
  "Boliche", "Golfe", "Surfe", "Parkour",
  // Profissões/objetos temáticos
  "Bisturi", "Martelo", "Pincel", "Violino", "Microfone", "Troféu",
  "Diploma", "Passaporte", "Bilhete", "Moeda",
  // Conceitos / abstratos simples
  "Segredo", "Sonho", "Memória", "Silêncio", "Sombra", "Eco",
];

export const LOCATIONS_WITH_ROLES: Record<string, string[]> = {
  Hospital: ["Cirurgião", "Enfermeiro", "Paciente", "Médico emergencista", "Anestesista", "Recepcionista", "Farmacêutico", "Psiquiatra"],
  Aeroporto: ["Piloto", "Comissário de bordo", "Passageiro", "Controlador de voo", "Agente de segurança", "Mecânico de aeronave", "Despachante", "Fiscal de alfândega"],
  "Escola de Magia": ["Diretor", "Professor de feitiços", "Aluno novato", "Guardião da biblioteca", "Fantasma residente", "Cuidador de criaturas", "Capitão do time", "Intruso"],
  "Nave Espacial": ["Capitão", "Engenheiro de propulsão", "Cientista", "Médico de bordo", "Piloto", "Robô de manutenção", "Passageiro clandestino", "Comandante de missão"],
  "Restaurante Japonês": ["Chef executivo", "Sushiman", "Garçom", "Gerente", "Cliente VIP", "Sommelier de saquê", "Entregador", "Aprendiz de cozinha"],
  "Delegacia de Polícia": ["Delegado", "Detetive sênior", "Policial civil", "Suspeito", "Testemunha", "Advogado de defesa", "Perito criminal", "Informante"],
  "Parque de Diversões": ["Gerente geral", "Operador de montanha-russa", "Palhaço", "Segurança", "Visitante ansioso", "Vendedor de algodão-doce", "Mascote do parque", "Técnico de manutenção"],
  Cinema: ["Projecionista", "Atendente de bilheteria", "Espectador", "Segurança", "Gerente", "Crítico de cinema", "Pipoqueiro", "Diretor de produção"],
  "Quartel de Bombeiros": ["Comandante", "Bombeiro veterano", "Motorista do caminhão", "Socorrista", "Recruta", "Despachante de emergência", "Voluntário", "Mecânico"],
  "Escola de Culinária": ["Chef instrutor", "Aluno iniciante", "Aluno avançado", "Auxiliar de cozinha", "Crítico gastronômico", "Fornecedor de ingredientes", "Diretor da escola", "Camareira"],
  "Estação Espacial": ["Astronauta líder", "Engenheiro de sistemas", "Biólogo", "Físico de partículas", "Controlador de missão na Terra", "Robô assistente", "Médico", "Fotógrafo espacial"],
  "Cassino": ["Crupiê", "Segurança de piso", "Apostador veterano", "Gerente de sala", "Contador", "Garçonete", "Detetive de fraudes", "Showman"],
  "Navio de Cruzeiro": ["Capitão", "Oficial de navigação", "Animador de bordo", "Chef de restaurante", "Passageiro idoso", "Médico de bordo", "Técnico de máquinas", "Concierge"],
  "Academia de Artes Marciais": ["Sensei", "Faixa preta graduado", "Aluno iniciante", "Árbitro de competição", "Técnico esportivo", "Patrocinador", "Rival", "Comentarista"],
  "Laboratório Secreto": ["Cientista-chefe", "Assistente de pesquisa", "Cobaia voluntária", "Agente de segurança", "Hacker intruso", "Investidor", "Engenheiro de hardware", "Vigilante noturno"],
  "Circo": ["Domador de leões", "Trapezista", "Palhaço-chefe", "Mágico", "Acrobata", "Dono do circo", "Bilheteiro", "Técnico de iluminação"],
  "Delegacia Futurista": ["Detetive cibernético", "Hacker arrestado", "Robô policial", "Analista de dados", "Advogado de IA", "Informante digital", "Engenheiro forense", "Chefe de divisão"],
  "Fazenda": ["Fazendeiro", "Veterinário", "Peão", "Agrônomo", "Tratador de animais", "Colhedor sazonal", "Mecânico de equipamentos", "Visitante curioso"],
  "Estúdio de Gravação": ["Produtor musical", "Vocalista", "Guitarrista", "Engenheiro de som", "DJ", "Manager da banda", "Técnico de estúdio", "Jornalista musical"],
  "Museu de Arte": ["Curador", "Restaurador", "Guarda de segurança", "Visitante", "Guia turístico", "Mecenas", "Artista em exposição", "Crítico de arte"],
  "Mansão Assombrada": ["Fantasma antigo", "Caçador de fantasmas", "Turista corajoso", "Zelador misterioso", "Parapsicólogo", "Câmera-man de reality", "Descendente do dono", "Exorcista"],
  "Supermercado": ["Gerente de loja", "Caixa", "Repositor de estoque", "Cliente apressado", "Segurança", "Promotor de vendas", "Faxineiro", "Fiscal de preços"],
  "Teatro": ["Diretor teatral", "Ator principal", "Ator coadjuvante", "Técnico de som", "Iluminador", "Maquiador", "Figurinista", "Crítico teatral"],
  "Trem Noturno": ["Maquinista", "Revisor", "Passageiro misterioso", "Detetive particular", "Viajante dormindo", "Contraventor", "Policial ferroviário", "Garçonete do vagão-restaurante"],
  "Zoológico": ["Zookeeper", "Biólogo", "Veterinário", "Visitante com criança", "Fotógrafo de natureza", "Diretor do zoológico", "Guia educacional", "Técnico de enriquecimento ambiental"],
  "Plataforma de Petróleo": ["Engenheiro-chefe", "Mergulhador", "Operador de plataforma", "Mecânico", "Cozinheiro", "Piloto de helicóptero", "Inspetor de segurança", "Gerente de operações"],
  "Escola de Espionagem": ["Diretor da agência", "Instrutor de campo", "Agente trainee", "Especialista em disfarces", "Analista de inteligência", "Hacker da agência", "Especialista em armamentos", "Toupeira infiltrada"],
  "Praia": ["Salva-vidas", "Ambulante", "Turista", "Instrutor de surfe", "Pescador", "Jogador de vôlei de praia", "Fotógrafo", "Dono de barraca"],
  "Hospital Psiquiátrico": ["Psiquiatra", "Psicólogo", "Enfermeiro especializado", "Paciente internado", "Assistente social", "Segurança", "Terapeuta ocupacional", "Visitante"],
  "Estação Antártica": ["Glaciologista", "Meteorologista", "Médico da base", "Piloto de helicóptero", "Biólogo marinho", "Cozinheiro", "Técnico de comunicações", "Pesquisador visitante"],
};

export const QUESTIONS = [
  // Pessoais
  "Qual é o seu maior medo?",
  "Se você pudesse ser qualquer animal, qual seria?",
  "O que você faria com um milhão de reais?",
  "Qual seria a sua última refeição?",
  "O que você nunca faria por dinheiro?",
  "Qual é a coisa mais corajosa que você já fez?",
  "Se você pudesse voltar no tempo, para quando iria?",
  "O que você faria no seu último dia na Terra?",
  "Qual é a coisa que você mais se arrepende de não ter feito?",
  "Se você fosse um personagem de filme, quem seria?",
  "O que você faria se soubesse que não ia falhar?",
  "Qual seria o seu superpoder ideal?",
  "Se você pudesse morar em qualquer lugar do mundo, onde seria?",
  "O que você nunca vai esquecer na sua vida?",
  "Se você pudesse mudar uma coisa no mundo, o que mudaria?",
  "Qual é a pior decisão que você já tomou?",
  "O que te faz levantar da cama de manhã?",
  "Se você tivesse que largar tudo e recomeçar, o que faria?",
  "Qual é o seu talento escondido?",
  "O que as pessoas geralmente se surpreendem ao descobrir sobre você?",
  // Filosóficas / dilemas
  "Você prefere ser rico e infeliz ou pobre e feliz?",
  "Se pudesse ser imortal, aceitaria?",
  "Você salvaria um estranho ou seu animal de estimação?",
  "Prefere saber como vai morrer ou quando vai morrer?",
  "Se todos os seus erros fossem públicos, você viveria diferente?",
  "Você prefere ter muitos amigos superficiais ou poucos amigos de verdade?",
  "O que é mais importante: ser amado ou ser respeitado?",
  "Se pudesse apagar uma memória, apagaria qual?",
  "Você abriria mão de 5 anos de vida para ser famoso?",
  "Prefere nunca mentir ou nunca ouvir a verdade?",
  "Se você soubesse que ia morrer amanhã, o que faria hoje?",
  "Você prefere viver 100 anos medíocres ou 50 anos extraordinários?",
  "O que você faria se descobrisse que tem 1 ano de vida?",
  "Você trocaria sua identidade por uma vida completamente diferente?",
  // Situacionais divertidas
  "O que você faria se acordasse famoso?",
  "Se você fosse invisível por um dia, o que faria?",
  "O que você faria se encontrasse uma mala cheia de dinheiro?",
  "Se você tivesse que viver em uma série de TV, qual escolheria?",
  "O que você faria se pudesse falar com animais?",
  "Se você tivesse que sobreviver sozinho em uma ilha, o que levaria?",
  "O que você faria se a IA tomasse seu emprego?",
  "Se você pudesse ter qualquer empresa do mundo, qual escolheria?",
  "O que você faria se acordasse no passado com todo seu conhecimento atual?",
  "Se você fosse presidente por um dia, o que mudaria?",
  // Revelações pessoais
  "Qual é a mentira que você mais repete?",
  "Qual é a coisa mais estranha que você acredita?",
  "O que você nunca contou pra ninguém?",
  "Qual é o maior risco que você já correu?",
  "O que você faz quando ninguém está olhando?",
  "Qual é o seu maior vício?",
  "O que você tem vergonha de gostar?",
  "Qual é o seu maior orgulho pessoal?",
  "O que te deixa com inveja nos outros?",
  "Qual é a coisa mais infantil que você ainda faz?",
];

export const TWO_FACTIONS_PAIRS = [
  // Comida
  ["Pizza", "Hambúrguer"],
  ["Café", "Chá"],
  ["Chocolate ao leite", "Chocolate amargo"],
  ["Sushi", "Churrasco"],
  ["Tapioca", "Pão de queijo"],
  ["Sorvete de creme", "Sorvete de chocolate"],
  ["Brigadeiro", "Beijinho"],
  ["Lasanha", "Macarrão"],
  // Animais
  ["Gato", "Cachorro"],
  ["Leão", "Tigre"],
  ["Tubarão", "Baleia"],
  ["Águia", "Coruja"],
  // Preferências de estilo de vida
  ["Praia", "Montanha"],
  ["Verão", "Inverno"],
  ["Cidade grande", "Interior"],
  ["Dia", "Noite"],
  ["Madrugador", "Coruja noturna"],
  ["Casa", "Apartamento"],
  ["Campo", "Mar"],
  // Pop culture
  ["Batman", "Superman"],
  ["Harry Potter", "Senhor dos Anéis"],
  ["Marvel", "DC"],
  ["Star Wars", "Star Trek"],
  ["PlayStation", "Xbox"],
  ["Android", "iPhone"],
  // Personalidade / comportamento
  ["Introvertido", "Extrovertido"],
  ["Organizado", "Bagunçado"],
  ["Racional", "Emocional"],
  ["Planejador", "Improvisador"],
  ["Aventureiro", "Caseiro"],
  // Entretenimento
  ["Filme", "Série"],
  ["Cinema", "Netflix"],
  ["Livro", "Audiobook"],
  ["Rock", "Pop"],
  ["Funk", "Sertanejo"],
  ["Futebol", "Basquete"],
  ["RPG", "FPS"],
  // Histórico / mitologia
  ["Vampiro", "Lobisomem"],
  ["Fada", "Bruxa"],
  ["Robô", "Alienígena"],
  ["Ninja", "Samurai"],
  ["Viking", "Pirata"],
];

export const CATEGORIES_WITH_ITEMS: Record<string, string[]> = {
  Frutas: ["Maçã", "Banana", "Morango", "Manga", "Uva", "Abacaxi", "Melão", "Kiwi", "Melancia", "Pêssego", "Cereja", "Goiaba", "Mamão", "Coco", "Framboesa"],
  Verduras: ["Alface", "Espinafre", "Rúcula", "Couve", "Repolho", "Agrião", "Acelga", "Brócolis", "Couve-flor", "Escarola"],
  "Instrumentos Musicais": ["Violão", "Piano", "Bateria", "Trompete", "Saxofone", "Flauta", "Violino", "Contrabaixo", "Guitarra elétrica", "Clarinete", "Trombone", "Harpa", "Acordeão", "Ukulele"],
  Esportes: ["Futebol", "Basquete", "Vôlei", "Tênis", "Natação", "Boxe", "Ciclismo", "Atletismo", "Judô", "Surfe", "Escalada", "Ginástica", "Handebol", "Polo aquático", "Rugby"],
  Países: ["Brasil", "Japão", "França", "Egito", "Austrália", "Argentina", "Índia", "Canadá", "México", "Itália", "Alemanha", "China", "Rússia", "Coreia do Sul", "Portugal", "Espanha", "Noruega"],
  Profissões: ["Médico", "Engenheiro", "Professor", "Chef", "Piloto", "Astronauta", "Arquiteto", "Bombeiro", "Jornalista", "Psicólogo", "Advogado", "Dentista", "Programador", "Fotógrafo", "Veterinário"],
  Animais: ["Leão", "Golfinho", "Águia", "Cobra", "Urso", "Lobo", "Tigre", "Elefante", "Pinguim", "Panda", "Tubarão", "Gorila", "Camelo", "Flamingo", "Tartaruga"],
  "Meios de Transporte": ["Avião", "Trem", "Navio", "Submarino", "Helicóptero", "Moto", "Bicicleta", "Teleférico", "Foguete", "Barco a vela", "Bonde", "Metrô", "Dirigível"],
  "Super-Heróis": ["Batman", "Homem-Aranha", "Mulher-Maravilha", "Superman", "Flash", "Homem de Ferro", "Thor", "Capitão América", "Pantera Negra", "Doutor Estranho", "Viúva Negra", "Aquaman"],
  "Tipos de Música": ["Rock", "Pop", "Samba", "Funk", "Forró", "Sertanejo", "Jazz", "Blues", "Hip-hop", "Metal", "Classical", "Reggae", "Eletrônica", "Pagode", "K-pop"],
  Oceanos: ["Atlântico", "Pacífico", "Índico", "Ártico", "Antártico"],
  Planetas: ["Mercúrio", "Vênus", "Terra", "Marte", "Júpiter", "Saturno", "Urano", "Netuno"],
  "Tipos de Queijo": ["Mozzarella", "Parmesão", "Cheddar", "Gorgonzola", "Brie", "Gouda", "Ricota", "Prato", "Coalho", "Gruyère"],
  "Capitais do Mundo": ["Paris", "Tóquio", "Londres", "Roma", "Berlim", "Madrid", "Pequim", "Moscou", "Cairo", "Buenos Aires", "Ottawa", "Lisboa", "Amsterdã", "Seul"],
  "Tipos de Cachorro": ["Labrador", "Pastor Alemão", "Bulldog", "Golden Retriever", "Husky", "Poodle", "Shih-Tzu", "Rottweiler", "Chihuahua", "Dálmata", "Beagle", "Boxer"],
  "Personagens de Disney": ["Simba", "Elsa", "Moana", "Ariel", "Bela", "Cinderela", "Woody", "Buzz", "Nemo", "Wall-E", "Stitch", "Rapunzel"],
  "Tipos de Macarrão": ["Espaguete", "Penne", "Fusilli", "Farfalle", "Lasanha", "Tagliatelle", "Rigatoni", "Linguine", "Orzo", "Gnocchi"],
  "Monumentos Históricos": ["Torre Eiffel", "Coliseu", "Machu Picchu", "Stonehenge", "Pirâmides de Gizé", "Taj Mahal", "Muralha da China", "Cristo Redentor", "Partenon", "Angkor Wat", "Big Ben"],
  "Tipos de Dança": ["Samba", "Forró", "Tango", "Valsa", "Hip-hop", "Ballet", "Flamenco", "Zouk", "Breakdance", "Salsa", "Axé"],
  "Elementos Químicos": ["Oxigênio", "Hidrogênio", "Ouro", "Ferro", "Carbono", "Hélio", "Urânio", "Prata", "Cobre", "Mercúrio", "Chumbo"],
  "Cidades do Brasil": ["São Paulo", "Rio de Janeiro", "Salvador", "Fortaleza", "Manaus", "Curitiba", "Recife", "Belo Horizonte", "Porto Alegre", "Florianópolis", "Belém", "Brasília"],
  "Tipos de Chocolate": ["Ao leite", "Amargo", "Branco", "Ruby", "Com avelã", "Com menta", "Com laranja", "Trufado", "Com amendoim", "Diet"],
  "Jogos de Tabuleiro": ["Xadrez", "Banco Imobiliário", "Detetive", "War", "Uno", "Catan", "Ticket to Ride", "Dobble", "Codenames", "Dixit"],
};

export const MOVIES_SERIES = [
  // Filmes clássicos
  {
    title: "O Poderoso Chefão",
    year: 1972, director: "Francis Ford Coppola",
    genre: "Crime / Drama",
    cast: "Marlon Brando, Al Pacino, James Caan",
    synopsis: "O patriarca de uma família mafiosa transfere o controle de seu império para o filho relutante após ser alvejado por rivais.",
  },
  {
    title: "Matrix",
    year: 1999, director: "Lana e Lilly Wachowski",
    genre: "Ação / Ficção Científica",
    cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    synopsis: "Um hacker descobre que toda a realidade é uma simulação computacional e se junta à resistência contra as máquinas.",
  },
  {
    title: "Interestelar",
    year: 2014, director: "Christopher Nolan",
    genre: "Ficção Científica",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    synopsis: "Com a Terra se tornando inabitável, um piloto viaja por um buraco de minhoca para encontrar um novo lar para a humanidade.",
  },
  {
    title: "A Origem",
    year: 2010, director: "Christopher Nolan",
    genre: "Ação / Ficção Científica",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    synopsis: "Um ladrão especializado em roubar segredos de sonhos recebe a missão inversa: plantar uma ideia na mente de alguém.",
  },
  {
    title: "Parasita",
    year: 2019, director: "Bong Joon-ho",
    genre: "Thriller / Drama",
    cast: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
    synopsis: "Uma família pobre e desempregada infiltra-se progressivamente na vida de uma família rica com consequências imprevisíveis.",
  },
  {
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    year: 2001, director: "Peter Jackson",
    genre: "Fantasia / Aventura",
    cast: "Elijah Wood, Ian McKellen, Viggo Mortensen",
    synopsis: "Um hobbit inicia uma jornada épica para destruir um anel mágico que ameaça escravizar toda a Terra Média.",
  },
  {
    title: "Clube da Luta",
    year: 1999, director: "David Fincher",
    genre: "Drama / Thriller",
    cast: "Brad Pitt, Edward Norton, Helena Bonham Carter",
    synopsis: "Um homem insatisfeito com sua vida monótona funda um clube secreto de luta que evolui para algo muito mais perigoso.",
  },
  {
    title: "Forrest Gump",
    year: 1994, director: "Robert Zemeckis",
    genre: "Drama / Comédia",
    cast: "Tom Hanks, Robin Wright, Gary Sinise",
    synopsis: "Um homem simples do Alabama atravessa décadas de história americana simplesmente seguindo seu coração.",
  },
  {
    title: "De Volta para o Futuro",
    year: 1985, director: "Robert Zemeckis",
    genre: "Aventura / Ficção Científica",
    cast: "Michael J. Fox, Christopher Lloyd, Lea Thompson",
    synopsis: "Um adolescente é acidentalmente enviado para 1955 e precisa garantir que seus pais se apaixonem para poder voltar ao futuro.",
  },
  {
    title: "Pulp Fiction",
    year: 1994, director: "Quentin Tarantino",
    genre: "Crime / Thriller",
    cast: "John Travolta, Samuel L. Jackson, Uma Thurman",
    synopsis: "Histórias interconectadas de criminosos, filósofos de boteco e assassinos profissionais na Los Angeles underground.",
  },
  {
    title: "Vingadores: Ultimato",
    year: 2019, director: "Anthony e Joe Russo",
    genre: "Ação / Ficção Científica",
    cast: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
    synopsis: "Os heróis sobreviventes se unem em uma missão desesperada para reverter o estalo de Thanos e restaurar o universo.",
  },
  {
    title: "O Labirinto do Fauno",
    year: 2006, director: "Guillermo del Toro",
    genre: "Fantasia / Drama",
    cast: "Ivana Baquero, Sergi López, Doug Jones",
    synopsis: "Na Espanha pós-guerra civil, uma menina descobre um labirinto mágico onde um fauno lhe revela ser uma princesa de um reino fantástico.",
  },
  {
    title: "Whiplash",
    year: 2014, director: "Damien Chazelle",
    genre: "Drama / Música",
    cast: "Miles Teller, J.K. Simmons, Melissa Benoist",
    synopsis: "Um jovem baterista ambicioso enfrenta um professor de música brutalmente exigente em busca da perfeição absoluta.",
  },
  {
    title: "La La Land",
    year: 2016, director: "Damien Chazelle",
    genre: "Romance / Musical",
    cast: "Ryan Gosling, Emma Stone, John Legend",
    synopsis: "Um pianista de jazz e uma atriz aspirante se apaixonam em Los Angeles enquanto perseguem seus sonhos artísticos.",
  },
  {
    title: "Coringa",
    year: 2019, director: "Todd Phillips",
    genre: "Drama / Thriller",
    cast: "Joaquin Phoenix, Robert De Niro, Zazie Beetz",
    synopsis: "A origem do lendário vilão: um comediante fracassado e perturbado descende à loucura e se transforma no Coringa.",
  },
  {
    title: "Oppenheimer",
    year: 2023, director: "Christopher Nolan",
    genre: "Drama histórico / Thriller",
    cast: "Cillian Murphy, Emily Blunt, Matt Damon",
    synopsis: "A história do físico J. Robert Oppenheimer e o desenvolvimento da primeira bomba atômica no Projeto Manhattan.",
  },
  {
    title: "Tudo em Todo o Lugar ao Mesmo Tempo",
    year: 2022, director: "Daniel Kwan e Daniel Scheinert",
    genre: "Ficção Científica / Comédia",
    cast: "Michelle Yeoh, Ke Huy Quan, Jamie Lee Curtis",
    synopsis: "Uma imigrante chinesa descobre que pode acessar habilidades de versões paralelas de si mesma e deve salvar o multiverso.",
  },
  {
    title: "Dune: Parte 1",
    year: 2021, director: "Denis Villeneuve",
    genre: "Ficção Científica / Épico",
    cast: "Timothée Chalamet, Zendaya, Oscar Isaac",
    synopsis: "Um jovem nobre é levado ao planeta desértico Arrakis, o único lugar do universo onde se produz a especiaria mais valiosa de todas.",
  },
  {
    title: "Saltburn",
    year: 2023, director: "Emerald Fennell",
    genre: "Thriller / Drama",
    cast: "Barry Keoghan, Jacob Elordi, Rosamund Pike",
    synopsis: "Um estudante de Oxford de origem humilde se torna obcecado por um colega aristocrata e passa o verão em sua mansão extravagante.",
  },
  {
    title: "Pobres Criaturas",
    year: 2023, director: "Yorgos Lanthimos",
    genre: "Fantasia / Drama",
    cast: "Emma Stone, Mark Ruffalo, Willem Dafoe",
    synopsis: "Uma jovem ressuscitada por um cientista excêntrico foge com um advogado libertino em uma aventura que a transforma completamente.",
  },
  // Séries
  {
    title: "Breaking Bad",
    year: 2008, director: "Vince Gilligan",
    genre: "Drama / Crime",
    cast: "Bryan Cranston, Aaron Paul, Anna Gunn",
    synopsis: "Um professor de química com câncer terminal se une a um ex-aluno para produzir metanfetamina e acaba se tornando um temido criminoso.",
  },
  {
    title: "Stranger Things",
    year: 2016, director: "Matt e Ross Duffer",
    genre: "Ficção Científica / Terror",
    cast: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder",
    synopsis: "Quando um menino desaparece, sua cidade descobre experimentos secretos do governo, forças sobrenaturais e uma menina com poderes.",
  },
  {
    title: "Game of Thrones",
    year: 2011, director: "David Benioff e D.B. Weiss",
    genre: "Fantasia / Drama",
    cast: "Emilia Clarke, Kit Harington, Peter Dinklage",
    synopsis: "Nobres famílias guerreiam pelo controle dos Sete Reinos enquanto uma ameaça sobrenatural avança pelo Norte.",
  },
  {
    title: "The Last of Us",
    year: 2023, director: "Craig Mazin e Neil Druckmann",
    genre: "Drama / Ficção Científica",
    cast: "Pedro Pascal, Bella Ramsey, Anna Torv",
    synopsis: "Um sobrevivente endurecido e uma adolescente imune percorrem um Estados Unidos devastado por um fungo que transforma humanos.",
  },
  {
    title: "Black Mirror",
    year: 2011, director: "Charlie Brooker",
    genre: "Ficção Científica / Thriller",
    cast: "Bryce Dallas Howard, Jon Hamm, Hayley Atwell",
    synopsis: "Antologia de histórias perturbadoras sobre o lado sombrio da tecnologia e seus efeitos na sociedade moderna.",
  },
  {
    title: "Chernobyl",
    year: 2019, director: "Johan Renck",
    genre: "Drama histórico / Thriller",
    cast: "Jared Harris, Stellan Skarsgård, Emily Watson",
    synopsis: "A reconstrução detalhada do desastre nuclear de Chernobyl em 1986 e os esforços desesperados para conter a catástrofe.",
  },
  {
    title: "Squid Game",
    year: 2021, director: "Hwang Dong-hyuk",
    genre: "Thriller / Drama",
    cast: "Lee Jung-jae, Park Hae-soo, HoYeon Jung",
    synopsis: "Centenas de pessoas endividadas participam de um torneio mortal de jogos infantis em troca de um prêmio milionário.",
  },
  {
    title: "Dark",
    year: 2017, director: "Baran bo Odar e Jantje Friese",
    genre: "Ficção Científica / Thriller",
    cast: "Louis Hofmann, Oliver Masucci, Karoline Eichhorn",
    synopsis: "O desaparecimento de crianças em uma cidade alemã expõe uma conspiração de viagem no tempo ligando quatro famílias ao longo de séculos.",
  },
  {
    title: "The Bear",
    year: 2022, director: "Christopher Storer",
    genre: "Drama / Comédia",
    cast: "Jeremy Allen White, Ebon Moss-Bachrach, Ayo Edebiri",
    synopsis: "Um chef premiado abandona restaurantes estrelados para tocar a lanchonete caótica da família após a morte do irmão.",
  },
  {
    title: "Succession",
    year: 2018, director: "Jesse Armstrong",
    genre: "Drama",
    cast: "Brian Cox, Jeremy Strong, Sarah Snook",
    synopsis: "Os filhos de um magnata da mídia disputam ferozmente pelo controle do império familiar enquanto o patriarca se recusa a soltar o poder.",
  },
  {
    title: "Severance",
    year: 2022, director: "Ben Stiller e Aoife McArdle",
    genre: "Thriller / Ficção Científica",
    cast: "Adam Scott, Patricia Arquette, John Turturro",
    synopsis: "Funcionários de uma empresa misteriosa passam por um procedimento que separa completamente suas memórias profissionais das pessoais.",
  },
  {
    title: "True Detective",
    year: 2014, director: "Cary Joji Fukunaga",
    genre: "Crime / Drama",
    cast: "Matthew McConaughey, Woody Harrelson, Michelle Monaghan",
    synopsis: "Dois detetives de personalidades opostas investigam uma série de assassinatos rituais ao longo de 17 anos no Louisiana.",
  },
  {
    title: "Peaky Blinders",
    year: 2013, director: "Steven Knight",
    genre: "Drama / Crime",
    cast: "Cillian Murphy, Helen McCrory, Tom Hardy",
    synopsis: "Na Birmingham pós-Primeira Guerra Mundial, uma família de gângsteres liderada por um veterano ambicioso constrói um império criminoso.",
  },
  {
    title: "Euphoria",
    year: 2019, director: "Sam Levinson",
    genre: "Drama",
    cast: "Zendaya, Hunter Schafer, Jacob Elordi",
    synopsis: "Um grupo de adolescentes navega por drogas, identidade, sexualidade e violência em uma cidade americana contemporânea.",
  },
  {
    title: "The Witcher",
    year: 2019, director: "Lauren Schmidt Hissrich",
    genre: "Fantasia / Ação",
    cast: "Henry Cavill, Freya Allan, Anya Chalotra",
    synopsis: "Um caçador de monstros mutante, uma feiticeira poderosa e uma princesa com um destino extraordinário se cruzam em um mundo fantástico.",
  },
];

export function getHintForMode(mode: GameMode, secretInfo: unknown): string {
  switch (mode) {
    case "secret-word": {
      const info = secretInfo as { word: string };
      const word = info.word;
      const firstLetter = word[0].toUpperCase();
      const length = word.length;
      return `A palavra tem ${length} letras e começa com "${firstLetter}"`;
    }
    case "location-role": {
      const info = secretInfo as { location: string };
      return `O local é ${getLocationHint(info.location)}`;
    }
    case "question": {
      const info = secretInfo as { question: string };
      const words = info.question.split(" ");
      const firstTwoWords = words.slice(0, 2).join(" ");
      return `A pergunta começa com "${firstTwoWords}..."`;
    }
    case "two-factions": {
      return `Existem duas palavras relacionadas entre si. Tente uma resposta vaga que sirva para as duas.`;
    }
    case "category-item": {
      const info = secretInfo as { category: string };
      return `A categoria é "${info.category}"`;
    }
    case "movie-series": {
      const info = secretInfo as { genre: string; year: number };
      return `É do gênero ${info.genre}${info.year ? `, lançado em ${info.year}` : ""}`;
    }
    default:
      return "Observe com atenção as respostas dos outros jogadores!";
  }
}

function getLocationHint(location: string): string {
  const hints: Record<string, string> = {
    Hospital: "um estabelecimento de saúde",
    Aeroporto: "um terminal de transporte aéreo",
    "Escola de Magia": "uma instituição de ensino incomum",
    "Nave Espacial": "um veículo fora da atmosfera terrestre",
    "Restaurante Japonês": "um estabelecimento gastronômico asiático",
    "Delegacia de Polícia": "um órgão de segurança pública",
    "Parque de Diversões": "um local de lazer e entretenimento",
    Cinema: "um espaço de exibição de filmes",
    "Quartel de Bombeiros": "uma unidade de serviço de emergência",
    "Escola de Culinária": "uma instituição de ensino gastronômico",
    "Estação Espacial": "uma estrutura orbital habitável",
    Cassino: "um local de jogos e apostas",
    "Navio de Cruzeiro": "um grande navio de viagens de lazer",
    "Academia de Artes Marciais": "um dojo de treinamento de combate",
    "Laboratório Secreto": "uma instalação de pesquisa sigilosa",
    Circo: "um espetáculo itinerante de entretenimento",
    "Delegacia Futurista": "um órgão policial tecnológico",
    Fazenda: "uma propriedade rural de produção",
    "Estúdio de Gravação": "um ambiente profissional de produção musical",
    "Museu de Arte": "um espaço de exposição cultural",
    "Mansão Assombrada": "uma residência misteriosa e assombrada",
    Supermercado: "um grande estabelecimento comercial de alimentos",
    Teatro: "um espaço de apresentações artísticas ao vivo",
    "Trem Noturno": "um transporte ferroviário com viagem longa",
    Zoológico: "um parque com animais de diversas espécies",
    "Plataforma de Petróleo": "uma instalação offshore de extração",
    "Escola de Espionagem": "uma agência de treinamento de espiões",
    Praia: "um local litorâneo de lazer",
    "Hospital Psiquiátrico": "uma clínica de saúde mental",
    "Estação Antártica": "uma base de pesquisa em clima extremo",
  };
  return hints[location] ?? "um local público conhecido";
}
