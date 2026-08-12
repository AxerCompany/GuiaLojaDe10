
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  CheckCircle2, 
  Smartphone, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Layers, 
  Zap, 
  Printer, 
  Gift, 
  FileText, 
  Award, 
  AlertCircle, 
  Quote, 
  Clock, 
  Unlock, 
  Lock,
  CreditCard, 
  MessageCircle,
  TrendingUp,
  Play, 
  ShieldAlert,
  MousePointer2,
  Scissors,
  Share2,
  Rocket,
  Camera,
  Target,
  DollarSign,
  Package,
  Timer,
  Users,
  Volume2,
  MoveRight,
  Info,
  Loader2,
  Video,
  CheckSquare
} from 'lucide-react';

// --- Helper Functions ---

const getEmbedUrl = (url: string) => {
  if (!url) return '';
  
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1].split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }

  let videoId = '';
  if (url.includes('/shorts/')) {
    videoId = url.split('/shorts/')[1].split('?')[0];
  } else if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('/embed/')) {
    return url;
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

// --- Reusable Components ---

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(900); // 15:00 initially for more urgency

  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 text-[#E91E63] font-black text-sm md:text-base animate-pulse">
      <div className="flex items-center gap-2">
        <Timer size={18} />
        <span>OFERTA EXPIRA EM: {formatTime(timeLeft)}</span>
      </div>
    </div>
  );
};

const ALL_SALES_NAMES = [
  'Ana Paula', 'Julia S.', 'Renata M.', 'Cláudia V.', 'Beatriz L.', 
  'Fernanda R.', 'Carla T.', 'Priscila M.', 'Sandra K.', 'Mônica P.', 
  'Patrícia A.', 'Daniela C.', 'Camila B.', 'Vanessa S.', 'Luciana G.', 
  'Aline F.', 'Juliana M.', 'Jéssica O.', 'Larissa R.', 'Mariana D.', 
  'Amanda V.', 'Bruna S.', 'Gabriela N.', 'Thaís M.', 'Carolina H.', 
  'Tatiane R.', 'Letícia P.', 'Débora F.', 'Simone B.', 'Fernanda A.'
];

function shuffleSalesNames<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const ScarcityNotification: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false);
  const [name, setName] = useState('');
  
  const deckRef = useRef<string[]>([]);
  const indexRef = useRef<number>(0);

  useEffect(() => {
    deckRef.current = shuffleSalesNames(ALL_SALES_NAMES);
    indexRef.current = 0;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show much earlier
        setHasReachedThreshold(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!hasReachedThreshold) return;

    const show = () => {
      if (deckRef.current.length === 0) {
        deckRef.current = shuffleSalesNames(ALL_SALES_NAMES);
        indexRef.current = 0;
      }

      let currentDeck = deckRef.current;
      let idx = indexRef.current;

      if (idx >= currentDeck.length) {
        const lastShown = currentDeck[currentDeck.length - 1];
        let newDeck = shuffleSalesNames(ALL_SALES_NAMES);
        if (newDeck[0] === lastShown && newDeck.length > 1) {
          [newDeck[0], newDeck[1]] = [newDeck[1], newDeck[0]];
        }
        deckRef.current = newDeck;
        indexRef.current = 0;
        idx = 0;
      }

      const nextName = deckRef.current[idx];
      indexRef.current = idx + 1;

      setName(nextName);
      setVisible(true);
      setTimeout(() => setVisible(false), 6000);
    };

    const interval = setInterval(show, 15000); // More frequent
    const timeout = setTimeout(show, 2000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [hasReachedThreshold]);

  return (
    <div className={`fixed bottom-6 left-6 z-[100] transition-all duration-700 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <div className="bg-[#FFFFFF]/95 backdrop-blur-md border border-[#F2DCE6] p-4 rounded-2xl flex items-center gap-4 shadow-[0_20px_50px_rgba(233,30,99,0.1)]">
        <div className="w-10 h-10 bg-[#22C55E] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#22C55E]/20 flex-shrink-0">
          <CheckCircle2 size={20} />
        </div>
        <div>
          <p className="text-[#1E1E1E] text-sm font-bold leading-tight">{name} acabou de garantir o acesso!</p>
          <p className="text-[#9B9B9B] text-[10px] uppercase tracking-widest font-black mt-1">Pagamento Confirmado</p>
        </div>
      </div>
    </div>
  );
};

interface CustomVideoPlayerProps {
  posterUrl: string;
  videoUrl?: string; 
  label?: string;
  isVertical?: boolean;
  priority?: boolean;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ posterUrl, videoUrl, label, isVertical = false, priority = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = useMemo(() => videoUrl ? getEmbedUrl(videoUrl) : '', [videoUrl]);

  const finalIframeSrc = useMemo(() => {
    if (!embedUrl) return '';
    if (embedUrl.includes('vimeo.com')) {
      return `${embedUrl}?autoplay=1&muted=0&badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0`;
    }
    return `${embedUrl}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1&controls=1`;
  }, [embedUrl]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute -inset-4 bg-[#FF5C93]/20 blur-3xl rounded-full opacity-50 pointer-events-none group-hover:opacity-75 transition-opacity" />
      
      <div 
        className={`w-full ${isVertical ? 'aspect-[9/16] max-w-[320px] mx-auto' : 'aspect-video'} rounded-3xl overflow-hidden relative shadow-[0_30px_60px_-15px_rgba(233,30,99,0.25)] group cursor-pointer transition-all duration-500 bg-[#1E1E1E] border-4 border-[#F2DCE6]/30 ring-1 ring-[#F2DCE6]/20`}
        onClick={() => setIsPlaying(true)}
      >
        {!isPlaying ? (
          <>
            <img 
              src={posterUrl}
              alt="Capa do Vídeo - Método Make Lucrativa"
              className="absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-110"
              fetchPriority={priority ? "high" : undefined}
              loading={priority ? "eager" : "lazy"}
              decoding="sync"
              width={isVertical ? 320 : 1280}
              height={isVertical ? 568 : 720}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            
            <div className="absolute top-4 left-4 bg-[#E91E63] text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg transform rotate-[-2deg] z-20">
              VEJA COMO FUNCIONA
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-[#E91E63] rounded-full animate-ping opacity-30 scale-150" />
                <div className="w-20 h-20 md:w-28 md:h-28 bg-[#E91E63] hover:bg-[#D81B60] rounded-full flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 transition-transform duration-300 border-4 border-white/30 backdrop-blur-sm relative z-10">
                  <Play size={44} fill="currentColor" className="ml-2" />
                </div>
              </div>
              {label && (
                <div className="mt-8 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 transform group-hover:-translate-y-1 transition-transform">
                  <p className="text-white text-[12px] font-black uppercase tracking-[0.2em]">{label}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-black">
             <iframe 
               className="w-full h-full"
               src={finalIframeSrc}
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               allowFullScreen
               frameBorder="0"
             />
          </div>
        )}
      </div>
    </div>
  );
};

// --- Image Carousel Component ---

interface ImageCarouselProps {
  images: string[];
  aspectRatio?: string;
  maxWidth?: string;
  autoplay?: boolean;
  interval?: number;
  width?: number;
  height?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  aspectRatio = "aspect-video", 
  maxWidth = "max-w-6xl",
  autoplay = true,
  interval = 3500,
  width = 800,
  height = 450
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Preload all carousel images in memory as soon as component mounts
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (autoplay && images.length > 1) {
      const timer = setInterval(next, interval);
      return () => clearInterval(timer);
    }
  }, [currentIndex, autoplay, images.length, interval]);

  useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      const scrollAmount = element.clientWidth * currentIndex;
      element.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div className={`relative group ${maxWidth} mx-auto`}>
      <div 
        ref={scrollRef}
        className="flex overflow-x-hidden snap-x snap-mandatory rounded-[2.5rem] shadow-2xl border border-[#F2DCE6] bg-[#FFF1F6]"
      >
        {images.map((img, i) => (
          <div key={i} className={`flex-shrink-0 w-full snap-center ${aspectRatio} relative overflow-hidden flex items-center justify-center bg-[#FFFFFF]`}>
            <img 
              src={img} 
              alt={`Slide ${i + 1}`} 
              className="w-full h-full object-contain rounded-2xl"
              loading={i <= 1 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              width={width}
              height={height}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1E1E1E] shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[#E91E63] hover:text-white z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1E1E1E] shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[#E91E63] hover:text-white z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-6 md:w-8 bg-[#E91E63]' : 'w-1.5 md:w-2 bg-white/50'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- Page Sections ---

const Hero: React.FC = () => (
  <section className="pt-6 md:pt-12 pb-12 md:pb-16 px-4 md:px-6 bg-[#FFF1F6] text-[#1E1E1E] flex flex-col items-center text-center relative overflow-hidden border-b border-[#F8E8EF]">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#FF5C93]/15 to-[#E91E63]/5 blur-[120px] rounded-full -z-10" />
    <div className="absolute -top-[10%] -right-[10%] w-[300px] h-[300px] bg-[#E91E63]/5 blur-[100px] rounded-full -z-10" />
    
    <div className="max-w-5xl mx-auto flex flex-col items-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 md:px-6 md:py-2 bg-[#FFF8FB] text-[#E91E63] rounded-full border border-[#F2DCE6] mb-4 md:mb-8 shadow-sm max-w-full">
        <Info size={13} className="shrink-0" />
        <span className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider md:tracking-[0.2em] italic truncate">OPORTUNIDADE ÚNICA DE RENDA EXTRA</span>
      </div>
      
      <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-[900] mb-5 md:mb-8 leading-[1.2] tracking-tight uppercase max-w-4xl mx-auto text-[#1E1E1E]">
        MONTE SUA LOJA DE <span className="text-[#E91E63]">MAQUIAGEM DE R$10</span> EM CASA E FATURE ATÉ <span className="text-[#E91E63]">R$1.000 POR SEMANA</span> — MESMO COMEÇANDO DO ZERO E SEM EXPERIÊNCIA.
      </h1>
      
      <p className="text-xs md:text-lg text-[#666666] mb-8 md:mb-14 font-black max-w-2xl mx-auto leading-relaxed">
        Assista ao vídeo abaixo e descubra como seguir um passo a passo simples para montar sua loja.
      </p>

      <div className="w-full max-w-3xl transform hover:scale-[1.01] transition-transform duration-500">
        <CustomVideoPlayer 
          posterUrl="/hero-poster.webp"
          label="CLIQUE PARA ATIVAR O SOM"
          videoUrl="https://vimeo.com/1217322803?share=copy&fl=sv&fe=ci"
          isVertical={true}
          priority={true}
        />
      </div>
    </div>
  </section>
);

const HowItWorks: React.FC = () => (
  <section className="py-16 bg-[#FFF8FB] px-6 border-b border-[#F8E8EF]">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-[#E91E63] font-black text-[12px] uppercase tracking-[0.4em] mb-3">O MÉTODO</p>
        <h2 className="text-2xl md:text-3xl font-black text-[#1E1E1E] mb-4 uppercase tracking-tighter italic leading-tight">COMO FUNCIONA O PROCESSO:</h2>
        <div className="w-16 h-1 bg-[#E91E63] mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { 
            icon: <Smartphone size={28} />, 
            title: "✅ 1. O PASSO A PASSO VAI DIRETO PRO SEU CELULAR", 
            desc: (
              <>
                Você acessa o Método Make Lucrativa e já vê exatamente como começar sua loja de maquiagem de R$10 em casa com apenas R$100, mesmo sem experiência e começando do zero.
              </>
            )
          },
          { 
            icon: <Package size={28} />, 
            title: "✅ 2. ESCOLHA OS PRODUTOS E COMPRE DIRETO DOS FORNECEDORES", 
            desc: (
              <>
                Você encontra os fornecedores, vê os produtos que mais vendem e monta seu primeiro estoque do jeito certo, sem gastar dinheiro com produtos que podem ficar parados.
              </>
            )
          },
          { 
            icon: <TrendingUp size={28} />, 
            title: "✅ 3. DIVULGUE SUA LOJA E COMECE A FAZER SUAS PRIMEIRAS VENDAS", 
            desc: (
              <>
                Use os textos prontos para divulgar e vender, acompanhe seu lucro e organize seu estoque de forma simples. É só seguir o passo a passo sem se sentir perdida.
              </>
            )
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-[#FFFFFF] p-10 rounded-[2rem] shadow-[0_12px_30px_rgba(233,30,99,0.04)] border border-[#F2DCE6] flex flex-col items-start">
            <div className="w-14 h-14 bg-[#FFF1F6] rounded-2xl flex items-center justify-center text-[#E91E63] mb-8 border border-[#F2DCE6]">
              {item.icon}
            </div>
            <h4 className="text-base md:text-lg font-black text-[#1E1E1E] uppercase tracking-tight mb-5 leading-[1.3] text-left">
              {item.title}
            </h4>
            <p className="text-[#666666] text-sm md:text-base font-medium leading-relaxed text-left">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features: React.FC = () => {
  const images = [
    "/hero-poster.webp",
    "https://i.postimg.cc/xCqzLQ32/Whats-App-Image-2026-08-11-at-14-04-59-(1).webp",
    "https://i.postimg.cc/Y9jWQ7zc/Whats-App-Image-2026-08-11-at-14-04-59-(2).webp",
    "https://i.postimg.cc/d1DyGFjP/Whats-App-Image-2026-08-11-at-14-05-00.webp",
    "https://i.postimg.cc/k4DbWCF0/Whats-App-Image-2026-08-11-at-14-05-00-(1).webp",
    "https://i.postimg.cc/LXh1jSB7/Whats-App-Image-2026-08-11-at-14-05-01-(1).webp",
    "https://i.postimg.cc/MT4jDL9X/Whats-App-Image-2026-08-11-at-14-05-02.webp",
    "https://i.postimg.cc/853rHYZc/Whats-App-Image-2026-08-11-at-14-05-02-(1).webp",
    "https://i.postimg.cc/MT4jDL9G/Whats-App-Image-2026-08-11-at-14-05-02-(2).webp",
    "https://i.postimg.cc/rmbtJHfV/Whats-App-Image-2026-08-11-at-14-05-02-(3).webp",
    "https://i.postimg.cc/qRYCLF1B/Whats-App-Image-2026-08-11-at-14-05-02-(4).webp",
    "https://i.postimg.cc/fLF0KP8N/Whats-App-Image-2026-08-11-at-14-05-03.webp",
    "https://i.postimg.cc/RF8nRYgm/Whats-App-Image-2026-08-11-at-14-05-03-(1).webp",
    "https://i.postimg.cc/zBMRjQxY/Whats-App-Image-2026-08-11-at-14-05-03-(2).webp",
    "https://i.postimg.cc/1tTNHdvZ/Whats-App-Image-2026-08-11-at-14-05-04.webp",
    "https://i.postimg.cc/pT7nZSqg/Whats-App-Image-2026-08-11-at-14-05-04-(1)-(1).webp",
    "https://i.postimg.cc/tT7xFbNq/Whats-App-Image-2026-08-11-at-14-05-05.webp",
    "https://i.postimg.cc/zB3gTNFJ/Whats-App-Image-2026-08-11-at-14-05-05-(1).webp",
    "https://i.postimg.cc/50jC8JSf/Whats-App-Image-2026-08-11-at-14-05-05-(2).webp"
  ];

  return (
    <section className="py-12 bg-[#FFF1F6] px-6 overflow-hidden border-b border-[#F8E8EF]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 px-2 max-w-2xl mx-auto">
          <p className="text-[#E91E63] font-black text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-2">
            MÉTODO MAKE LUCRATIVA NO SEU CELULAR
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-[#1E1E1E] mb-3 uppercase tracking-tight italic leading-snug max-w-xl mx-auto">
            SUA LOJA DE MAQUIAGEM DE R$10 NA PALMA DA MÃO
          </h2>
          <p className="text-[#666666] text-xs sm:text-sm md:text-base font-medium max-w-md md:max-w-xl mx-auto leading-relaxed">
            Tudo o que você precisa para começar em casa, em um só lugar: passo a passo completo.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mb-10 text-center opacity-80">
          <p className="text-[13px] md:text-sm font-black text-[#1E1E1E] leading-relaxed max-w-md">
            Deslize para o lado e descubra tudo o que você encontra no método.
          </p>
          <div className="mt-2 text-[#E91E63]">
            <MoveRight size={16} />
          </div>
        </div>

        <div className="mb-12">
          <ImageCarousel 
            images={images} 
            aspectRatio="aspect-[9/16]" 
            maxWidth="max-w-[360px]" 
            autoplay={true}
            interval={3500}
            width={360}
            height={640}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Rocket size={28} />, title: "🚀 COMECE SUA LOJA COM APENAS R$100", desc: "Descubra exatamente quais produtos comprar com seus primeiros R$100 e monte seu primeiro estoque do jeito certo, sem gastar dinheiro à toa." },
            { icon: <FileText size={28} />, title: "📖 PASSO A PASSO DO ZERO AO PRIMEIRO LUCRO", desc: "Saiba exatamente o que fazer primeiro, mesmo sem experiência. É só abrir o método e seguir cada etapa." },
            { icon: <Layers size={28} />, title: "🏪 LISTA DE FORNECEDORES SELECIONADOS", desc: "Compre direto de fornecedores confiáveis, com produtos baratos, sem pedido mínimo e com muito mais margem de lucro." },
            { icon: <Zap size={28} />, title: "🔥 PRODUTOS QUE MAIS VENDEM", desc: "Veja quais produtos têm maior giro para investir seu dinheiro nos produtos certos e vender mais rápido." },
            { icon: <DollarSign size={28} />, title: "💰 CALCULADORA AUTOMÁTICA DE LUCRO", desc: "Saiba exatamente quanto cobrar, quanto vai lucrar e quanto precisa vender para alcançar sua meta." },
            { icon: <Package size={28} />, title: "📦 CONTROLE DE ESTOQUE SIMPLIFICADO", desc: "Organize sua loja de forma simples e saiba exatamente quais produtos precisam de reposição." },
            { icon: <Volume2 size={28} />, title: "📢 TEXTOS PRONTOS PARA DIVULGAR", desc: "Copie, cole e comece a divulgar seus produtos no Instagram, WhatsApp e Status." },
            { icon: <TrendingUp size={28} />, title: "📈 PLANO PARA FAZER SUAS PRIMEIRAS VENDAS", desc: "Siga um plano simples para conquistar seus primeiros clientes e transformar sua loja em uma renda de verdade." }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center bg-[#FFFFFF] p-8 rounded-2xl border border-[#F2DCE6] shadow-sm">
              <div className="w-14 h-14 bg-[#FFF8FB] rounded-2xl flex items-center justify-center text-[#E91E63] border border-[#F2DCE6] mb-6 shadow-sm">
                {item.icon}
              </div>
              <h4 className="text-sm md:text-base font-black text-[#1E1E1E] uppercase tracking-tight mb-3 leading-tight">{item.title}</h4>
              <p className="text-[#666666] text-[12px] md:text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Juliana Martins",
      role: "Empreendedora",
      text: "Eu já tinha salvo um monte de vídeos e até comprado uma lista de fornecedores. O problema é que eu continuava sem saber o que fazer primeiro. O Método Make Lucrativa foi o primeiro lugar onde encontrei tudo organizado. Era só abrir e seguir o passo a passo. Isso me deu muito mais segurança para começar. 🥰",
      image: "https://i.postimg.cc/0jh0NnNF/image_15_300x300.webp"
    },
    {
      name: "Fernanda Souza",
      role: "Iniciante",
      text: "O que mais gostei foi que o método não entrega só os fornecedores. Ele mostra quais produtos comprar primeiro, quanto investir, como calcular o lucro e até como divulgar. Eu nunca tinha vendido nada e, pela primeira vez, senti que realmente sabia por onde começar. 💖",
      image: "https://i.postimg.cc/CKwHdzFq/image_13_229x300.webp"
    },
    {
      name: "Patrícia Oliveira",
      role: "Renda Extra",
      text: "Eu tinha muito medo de gastar meus primeiros R$100 comprando os produtos errados. O método mostra exatamente o que comprar e em qual ordem fazer as coisas. Isso tirou aquela sensação de estar perdida o tempo todo. ✨",
      image: "https://i.postimg.cc/0NCnC7tX/image_14_300x300.webp"
    },
    {
      name: "Camila Ferreira",
      role: "Empreendedora",
      text: "O controle de estoque e a calculadora de lucro foram o que mais me surpreenderam. Eu achei que fosse receber só um conteúdo simples, mas o Método Make Lucrativa é muito mais completo. Hoje consigo organizar minhas compras e acompanhar melhor o que realmente sobra em cada venda. 😊",
      image: "https://i.postimg.cc/t4QzQBwx/image_16_281x300.webp"
    }
  ];

  return (
    <section className="py-16 bg-[#FFF8FB] px-6 border-b border-[#F8E8EF]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#E91E63] font-black text-[12px] uppercase tracking-[0.4em] mb-3">RESULTADOS REAIS</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#1E1E1E] mb-4 uppercase tracking-tighter italic">O QUE ELAS ESTÃO DIZENDO</h2>
          <div className="w-16 h-1 bg-[#E91E63] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#FFFFFF] p-8 rounded-2xl shadow-sm border border-[#F2DCE6] flex flex-col relative">
              <div className="absolute top-8 right-8 text-[#E91E63]/10">
                <Quote size={48} fill="currentColor" />
              </div>
              <div className="flex gap-1 mb-6 text-[#FACC15]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-[#666666] text-sm md:text-base font-medium italic leading-relaxed mb-8 flex-grow">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F2DCE6]">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-full h-full object-cover" 
                    width={48} 
                    height={48} 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#1E1E1E] uppercase tracking-tight">{t.name}</h4>
                  <p className="text-[10px] font-bold text-[#E91E63] uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Results: React.FC = () => {
  const products = [
    {
      name: "Gloss Labial Hydra Gloss",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80&fm=webp",
      cost: "R$ 2,50",
      sell: "R$ 10,00",
      profit: "R$ 7,50",
      badge: "🔥 Alto Giro"
    },
    {
      name: "Batom Matte Aveludado",
      image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=600&q=80&fm=webp",
      cost: "R$ 2,20",
      sell: "R$ 10,00",
      profit: "R$ 7,80",
      badge: "⭐ Mais Vendido"
    },
    {
      name: "Máscara para Cílios Volume",
      image: "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=600&q=80&fm=webp",
      cost: "R$ 3,10",
      sell: "R$ 10,00",
      profit: "R$ 6,90",
      badge: "🚀 Grande Margem"
    },
    {
      name: "Delineador Líquido Preto",
      image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=600&q=80&fm=webp",
      cost: "R$ 2,40",
      sell: "R$ 10,00",
      profit: "R$ 7,60",
      badge: "💖 Ideal para Começar"
    },
    {
      name: "Esponja de Maquiagem Gota",
      image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=600&q=80&fm=webp",
      cost: "R$ 1,20",
      sell: "R$ 10,00",
      profit: "R$ 8,80",
      badge: "🔥 Alto Giro"
    },
    {
      name: "Kit Pincéis de Maquiagem",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80&fm=webp",
      cost: "R$ 3,80",
      sell: "R$ 12,00",
      profit: "R$ 8,20",
      badge: "⭐ Mais Vendido"
    },
    {
      name: "Sérum Facial Iluminador C",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80&fm=webp",
      cost: "R$ 3,50",
      sell: "R$ 12,00",
      profit: "R$ 8,50",
      badge: "🚀 Grande Margem"
    },
    {
      name: "Sabonete Facial Demaquilante",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80&fm=webp",
      cost: "R$ 2,80",
      sell: "R$ 10,00",
      profit: "R$ 7,20",
      badge: "💖 Ideal para Começar"
    },
    {
      name: "Hidratante Facial Primer",
      image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80&fm=webp",
      cost: "R$ 3,20",
      sell: "R$ 10,00",
      profit: "R$ 6,80",
      badge: "🔥 Alto Giro"
    },
    {
      name: "Necessaire de Maquiagem",
      image: "https://images.unsplash.com/photo-1566958769312-82cef41d19ef?auto=format&fit=crop&w=600&q=80&fm=webp",
      cost: "R$ 3,00",
      sell: "R$ 10,00",
      profit: "R$ 7,00",
      badge: "⭐ Mais Vendido"
    },
    {
      name: "Esfoliante Labial Suave",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80&fm=webp",
      cost: "R$ 2,10",
      sell: "R$ 10,00",
      profit: "R$ 7,90",
      badge: "💖 Ideal para Começar"
    },
    {
      name: "Lenços Demaquilantes Suaves",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80&fm=webp",
      cost: "R$ 2,60",
      sell: "R$ 10,00",
      profit: "R$ 7,40",
      badge: "🚀 Grande Margem"
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-[#FFF1F6] px-6 border-y border-[#F8E8EF]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 px-2 max-w-xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#1E1E1E] mb-1.5 uppercase tracking-tight italic leading-snug">
            VEJA POR QUANTO AS LOJAS COMPRAM...
          </h2>
          <h3 className="text-base sm:text-lg md:text-xl font-black text-[#E91E63] mb-3 uppercase tracking-tight italic leading-snug">
            ...E POR QUANTO ELAS VENDEM.
          </h3>
          <p className="text-[#666666] text-xs sm:text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed">
            Quando você compra direto dos fornecedores certos, sua margem de lucro pode ser muito maior.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8 text-center opacity-80">
          <p className="text-[12px] md:text-xs font-black text-[#1E1E1E] uppercase tracking-widest">
            Deslize para ver as comparações
          </p>
          <div className="text-[#E91E63]">
            <MoveRight size={16} />
          </div>
        </div>

        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-[#1E1E1E] shadow-xl z-20 border border-[#F2DCE6] hover:bg-[#E91E63] hover:text-white transition-all hidden md:flex"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-[#1E1E1E] shadow-xl z-20 border border-[#F2DCE6] hover:bg-[#E91E63] hover:text-white transition-all hidden md:flex"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory py-4 px-2 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((p, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[280px] sm:w-[300px] snap-center bg-white rounded-3xl p-6 border border-[#F2DCE6] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FFF8FB] mb-5 border border-[#F2DCE6]/60 flex items-center justify-center p-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <h4 className="text-base font-black text-[#1E1E1E] mb-5 text-center leading-tight min-h-[44px] flex items-center justify-center">
                    {p.name}
                  </h4>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm bg-[#FFF1F6] p-3 rounded-xl border border-[#F2DCE6]">
                      <span className="font-bold text-[#666666]">💰 Compra no fornecedor</span>
                      <span className="font-black text-[#1E1E1E]">{p.cost}</span>
                    </div>

                    <div className="flex justify-center text-[#E91E63] my-1">
                      <ChevronDown size={18} />
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm bg-[#FFF1F6] p-3 rounded-xl border border-[#F2DCE6]">
                      <span className="font-bold text-[#666666]">🏷️ Preço de venda</span>
                      <span className="font-black text-[#1E1E1E]">{p.sell}</span>
                    </div>

                    <div className="flex justify-center text-[#E91E63] my-1">
                      <ChevronDown size={18} />
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm bg-[#DCFCE7] p-3 rounded-xl border border-[#22C55E]/30">
                      <span className="font-bold text-[#15803D]">📈 Lucro aproximado</span>
                      <span className="font-black text-[#15803D]">{p.profit}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F8E8EF] flex justify-center">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#E91E63] bg-[#FFF1F6] px-3 py-1.5 rounded-full border border-[#F2DCE6]">
                    {p.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[#9B9B9B] text-xs font-semibold mt-8 italic max-w-xl mx-auto">
          Esses são apenas alguns exemplos de produtos encontrados pelos fornecedores disponíveis dentro do método.
        </p>
      </div>
    </section>
  );
};

const Deliverables: React.FC = () => {
  return (
    <section className="py-12 bg-[#FFF8FB] px-6">
      <div className="max-w-4xl mx-auto">


        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative flex">
            <div className="relative bg-[#FFFFFF] border border-[#F2DCE6] rounded-[2rem] p-8 shadow-md flex flex-col items-center text-center w-full justify-between">
              <div>
                <div className="w-20 h-20 bg-[#E91E63] rounded-3xl flex items-center justify-center text-white mb-8 rotate-3 shadow-lg shadow-[#E91E63]/25 mx-auto">
                  <Video size={40} />
                </div>
                <div className="mb-6">
                  <span className="text-xs font-black text-[#E91E63] bg-[#FFF1F6] px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block border border-[#F2DCE6]">🎁 BÔNUS 01</span>
                  <h4 className="text-lg md:text-xl font-black text-[#1E1E1E] uppercase tracking-tight mb-5 italic leading-snug">
                    VÍDEO AULA COMPLETA: COMO USAR O MÉTODO DO JEITO CERTO
                  </h4>

                  <ul className="text-left text-xs text-[#1E1E1E] font-semibold space-y-2 bg-[#FFF1F6] p-4 rounded-xl border border-[#F2DCE6]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#E91E63] font-bold">✓</span>
                      <span>Como navegar pelo método e aproveitar todas as etapas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E91E63] font-bold">✓</span>
                      <span>Onde encontrar fornecedores, produtos e ferramentas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E91E63] font-bold">✓</span>
                      <span>Como usar a calculadora automática de lucro.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E91E63] font-bold">✓</span>
                      <span>Como organizar seu estoque de forma simples.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E91E63] font-bold">✓</span>
                      <span>Como seguir o passo a passo sem se sentir perdida.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-auto w-full pt-6 border-t border-[#F8E8EF]">
                <span className="text-[11px] font-black text-[#E91E63] px-6 py-2 bg-[#FFF1F6] rounded-full uppercase tracking-[0.2em] italic border border-[#F2DCE6] line-through decoration-[#9B9B9B] font-sans inline-block mb-2">
                  DE R$ 49,90
                </span>
                <p className="text-xs text-[#22C55E] font-black uppercase tracking-widest bg-[#DCFCE7] py-1.5 px-4 rounded-full border border-[#22C55E]/30 inline-block">
                  HOJE: GRÁTIS
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex">
            <div className="relative bg-[#FFFFFF] border border-[#F2DCE6] rounded-[2rem] p-8 shadow-md flex flex-col items-center text-center w-full justify-between">
              <div>
                <div className="w-20 h-20 bg-[#D81B60] rounded-3xl flex items-center justify-center text-white mb-8 -rotate-3 shadow-lg shadow-[#D81B60]/25 mx-auto">
                  <TrendingUp size={40} />
                </div>
                <div className="mb-6">
                  <span className="text-xs font-black text-[#D81B60] bg-[#FFF1F6] px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block border border-[#F2DCE6]">🎁 BÔNUS 02</span>
                  <h4 className="text-lg md:text-xl font-black text-[#1E1E1E] uppercase tracking-tight mb-5 italic leading-snug">
                    FATURE SEUS PRIMEIROS R$500 COM SUA LOJA DE MAQUIAGEM DE R$10
                  </h4>

                  <ul className="text-left text-xs text-[#1E1E1E] font-semibold space-y-2 bg-[#FFF1F6] p-4 rounded-xl border border-[#F2DCE6]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#D81B60] font-bold">✓</span>
                      <span>Como escolher os primeiros produtos para vender mais rápido.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D81B60] font-bold">✓</span>
                      <span>Como investir seus primeiros R$100 sem comprar produtos errados.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D81B60] font-bold">✓</span>
                      <span>Como organizar o dinheiro das primeiras vendas para fazer reposições.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D81B60] font-bold">✓</span>
                      <span>Estratégias simples para conseguir seus primeiros clientes usando apenas WhatsApp e Instagram.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D81B60] font-bold">✓</span>
                      <span>Como transformar sua renda extra em uma loja cada vez mais lucrativa.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-auto w-full pt-6 border-t border-[#F8E8EF]">
                <span className="text-[11px] font-black text-[#D81B60] px-6 py-2 bg-[#FFF1F6] rounded-full uppercase tracking-[0.2em] italic border border-[#F2DCE6] line-through decoration-[#9B9B9B] font-sans inline-block mb-2">
                  DE R$ 49,90
                </span>
                <p className="text-xs text-[#22C55E] font-black uppercase tracking-widest bg-[#DCFCE7] py-1.5 px-4 rounded-full border border-[#22C55E]/30 inline-block">
                  HOJE: GRÁTIS
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex">
            <div className="relative bg-[#FFFFFF] border border-[#F2DCE6] rounded-[2rem] p-8 shadow-md flex flex-col items-center text-center w-full justify-between">
              <div>
                <div className="w-20 h-20 bg-[#FF5C93] rounded-3xl flex items-center justify-center text-white mb-8 rotate-3 shadow-lg shadow-[#FF5C93]/25 mx-auto">
                  <CheckSquare size={40} />
                </div>
                <div className="mb-6">
                  <span className="text-xs font-black text-[#FF5C93] bg-[#FFF1F6] px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block border border-[#F2DCE6]">🎁 BÔNUS 03</span>
                  <h4 className="text-lg md:text-xl font-black text-[#1E1E1E] uppercase tracking-tight mb-5 italic leading-snug">
                    CHECKLIST COMPLETO PARA MONTAR SUA LOJA DO ZERO
                  </h4>

                  <ul className="text-left text-xs text-[#1E1E1E] font-semibold space-y-2 bg-[#FFF1F6] p-4 rounded-xl border border-[#F2DCE6]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF5C93] font-bold">✓</span>
                      <span>O que fazer antes de comprar os primeiros produtos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF5C93] font-bold">✓</span>
                      <span>Como organizar seu primeiro estoque.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF5C93] font-bold">✓</span>
                      <span>Tudo o que precisa para começar a vender em casa.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF5C93] font-bold">✓</span>
                      <span>Como preparar sua loja para receber os primeiros pedidos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF5C93] font-bold">✓</span>
                      <span>Acompanhe cada etapa até fazer sua primeira venda.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-auto w-full pt-6 border-t border-[#F8E8EF]">
                <span className="text-[11px] font-black text-[#FF5C93] px-6 py-2 bg-[#FFF1F6] rounded-full uppercase tracking-[0.2em] italic border border-[#F2DCE6] line-through decoration-[#9B9B9B] font-sans inline-block mb-2">
                  DE R$ 29,90
                </span>
                <p className="text-xs text-[#22C55E] font-black uppercase tracking-widest bg-[#DCFCE7] py-1.5 px-4 rounded-full border border-[#22C55E]/30 inline-block">
                  HOJE: GRÁTIS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Specialist: React.FC = () => {
  return (
    <section className="py-16 bg-[#FFFFFF] px-6 border-y border-[#F8E8EF]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#E91E63] font-black text-[12px] uppercase tracking-[0.4em] mb-3">CONHEÇA A CRIADORA DO MÉTODO</p>
          <h2 className="text-2xl md:text-4xl font-black text-[#1E1E1E] uppercase tracking-tighter italic">
            QUEM ESTÁ POR TRÁS DO MÉTODO?
          </h2>
          <div className="w-16 h-1 bg-[#E91E63] mx-auto rounded-full mt-4" />
        </div>

        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#FF5C93] to-[#E91E63] rounded-[2.5rem] blur-xl opacity-20" />
              <div className="relative bg-[#FFF8FB] border-4 border-[#F2DCE6] rounded-[2.2rem] overflow-hidden shadow-2xl">
                <img
                  src="/camila.png"
                  alt="Camila - Criadora do Método"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-4 bg-[#FFFFFF] text-center border-t border-[#F2DCE6]">
                  <h4 className="font-black text-[#1E1E1E] uppercase tracking-tight text-base">CAMILA</h4>
                  <p className="text-[#E91E63] font-bold text-xs uppercase tracking-widest">Criadora do Método Make Lucrativa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 text-[#444444] text-sm md:text-base font-medium leading-relaxed">
            <h3 className="text-xl md:text-2xl font-black text-[#1E1E1E] uppercase tracking-tight italic mb-2">
              Olá, eu sou a <span className="text-[#E91E63]">Camila</span>.
            </h3>
            
            <p>
              Eu sei como é querer começar um negócio e não saber por onde começar.
            </p>
            <p>
              Quando a gente pesquisa na internet, encontra um vídeo falando uma coisa, outro dizendo outra, uma lista de fornecedores aqui, uma dica ali... e no final continua sem saber qual é o primeiro passo.
            </p>
            <p className="font-bold text-[#1E1E1E]">
              Foi por isso que criei o Método Make Lucrativa.
            </p>
            <p>
              Meu objetivo foi reunir, em um único lugar, tudo o que eu gostaria que alguém tivesse me mostrado quando comecei a estudar esse modelo de negócio.
            </p>
            <div className="bg-[#FFF1F6] p-5 rounded-2xl border border-[#F2DCE6] text-[#1E1E1E] font-semibold text-xs md:text-sm leading-relaxed my-2">
              Aqui você encontra um passo a passo simples, fornecedores selecionados, os produtos que mais vendem, uma calculadora automática de lucro, controle de estoque simplificado, textos prontos para divulgação e ferramentas que ajudam você a montar sua loja de maquiagem de R$10 em casa sem se sentir perdida.
            </div>
            <p>
              Quero que você pare de juntar informações soltas e tenha um caminho claro para seguir.
            </p>
            <p>
              É só abrir o método, seguir cada etapa e começar no seu ritmo.
            </p>
            <p className="font-black text-[#E91E63] italic pt-2">
              Espero que ele facilite a sua jornada tanto quanto foi pensado para facilitar a vida de quem está começando.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = () => {
    if (isLoading) return;

    setIsLoading(true);
    
    const baseUrl = "https://pay.wiapy.com/734v6YGryLWL";
    const currentParams = window.location.search;
    
    let destinationUrl = baseUrl;
    if (currentParams) {
      const cleanParams = currentParams.startsWith("?") ? currentParams : `?${currentParams}`;
      destinationUrl = baseUrl.includes("?") 
        ? `${baseUrl}&${cleanParams.substring(1)}` 
        : `${baseUrl}${cleanParams}`;
    }
    
    setTimeout(() => {
      window.location.href = destinationUrl;
    }, 300);

    setTimeout(() => {
      setIsLoading(false);
    }, 8000);
  };

  return (
    <section id="offer" className="py-12 bg-[#FFF1F6] px-6 border-y border-[#F8E8EF]">
      <div className="max-w-lg mx-auto">
        <div className="bg-[#FFFFFF] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(233,30,99,0.12)] border-2 border-[#F2DCE6] relative">
          <div className="bg-[#E91E63] py-4 text-center text-white text-[12px] font-black uppercase tracking-[0.3em]">
            OFERTA EXCLUSIVA • VAGAS LIMITADAS
          </div>
          
          <div className="p-8 md:p-10 text-center">
            <h3 className="text-2xl font-black text-[#1E1E1E] mb-3 uppercase tracking-tighter italic leading-tight">
              ACESSO COMPLETO AO<br />
              <span className="text-[#E91E63]">MÉTODO MAKE LUCRATIVA</span>
            </h3>
            <p className="text-xs md:text-sm font-medium text-[#666666] mb-6 max-w-sm mx-auto leading-relaxed">
              O passo a passo completo para montar sua loja em casa, mesmo começando do zero e com apenas R$100.
            </p>

            <div className="flex flex-col items-center mb-8 bg-[#FFF1F6] p-4 rounded-2xl border border-[#F2DCE6]">
              <p className="text-[#1E1E1E] text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span>🔥</span> OFERTA EXPIRA EM:
              </p>
              <CountdownTimer />
              <p className="text-[#E91E63] text-[11px] font-bold text-center mt-3 leading-tight">
                O preço sobe ao final da oferta ou quando as vagas promocionais forem preenchidas.
              </p>
            </div>

            {/* Progress Bar Scarcity */}
            <div className="mb-10 px-2">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[#1E1E1E] text-[11px] font-black uppercase tracking-widest">VAGAS PREENCHIDAS</span>
                <span className="text-[#E91E63] text-sm font-black">78%</span>
              </div>
              <div className="w-full h-3.5 bg-[#FFF1F6] rounded-full overflow-hidden border border-[#F2DCE6]">
                <div className="h-full bg-[#E91E63] rounded-full w-[78%] animate-pulse" />
              </div>
              <p className="text-[#9B9B9B] text-[10px] font-bold uppercase tracking-wider mt-2.5">
                Últimas licenças disponíveis nesta condição especial.
              </p>
            </div>

            <div className="mb-10">
              <div className="flex flex-col items-center justify-center text-[#1E1E1E]">
                <p className="text-[#1E1E1E] text-xs font-black uppercase tracking-widest mb-2">APROVEITE A OFERTA DE LANÇAMENTO</p>
                <div className="h-px w-16 bg-[#E91E63] mb-4" />
                <div className="flex flex-col items-center">
                   <span className="text-[#9B9B9B] text-xs line-through font-bold mb-1">De R$ 197,00</span>
                   <span className="text-[#1E1E1E] text-xs font-black uppercase tracking-widest mb-1">POR APENAS</span>
                   <div className="flex items-baseline gap-1 text-[#E91E63]">
                     <span className="text-[#1E1E1E] text-2xl font-black">R$</span>
                     <span className="text-[#E91E63] text-7xl font-black tracking-tighter">37</span>
                     <span className="text-[#E91E63] text-2xl font-black">,00</span>
                   </div>
                   <span className="text-[#666666] text-[11px] font-bold uppercase tracking-wider mt-2">OU EM ATÉ 7X NO CARTÃO</span>
                </div>
              </div>
            </div>

            <div className="space-y-3.5 mb-10 text-left border-t border-b border-[#F8E8EF] py-8">
              {[
                "Acesso imediato ao Método Make Lucrativa no seu E-mail",
                "Passo a passo completo para montar sua loja do zero",
                "Plano para começar com apenas R$100",
                "Lista de fornecedores selecionados",
                "Produtos que mais vendem",
                "Calculadora automática de lucro",
                "Controle de estoque simplificado",
                "Textos prontos para divulgação",
                "Plano para fazer suas primeiras vendas",
                "Garantia incondicional de 7 dias",
                "BÔNUS 01: Vídeo aula completa ensinando como usar o método",
                "BÔNUS 02: Fature seus primeiros R$500 com sua loja de maquiagem de R$10",
                "BÔNUS 03: Checklist completo para montar sua loja do zero"
              ].map((text, idx) => {
                const isBonus = text.startsWith("BÔNUS");
                return (
                  <div key={idx} className={`flex items-start gap-3 text-xs md:text-sm font-bold ${isBonus ? 'text-[#E91E63] font-extrabold bg-[#FFF1F6] p-2.5 rounded-xl border border-[#F2DCE6]' : 'text-[#444444]'}`}>
                    <span className="text-[14px] flex-shrink-0 leading-tight">{isBonus ? '🎁' : '✅'}</span>
                    <span className="leading-tight">{text}</span>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={handlePurchase}
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-[#D81B60]/70 cursor-not-allowed' : 'bg-[#E91E63] hover:bg-[#D81B60] active:scale-95'} text-white text-base md:text-lg font-black py-6 rounded-2xl transition-all uppercase tracking-tight shadow-xl shadow-[#E91E63]/30 mb-6 group relative overflow-hidden`}
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    PROCESSANDO...
                  </>
                ) : (
                  <>
                    LIBERAR MEU ACESSO AGORA
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              
              {!isLoading && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              )}
            </button>
            
            <div className="flex items-center justify-center gap-3 opacity-80">
              <CreditCard size={18} className="text-[#666666]" />
              <span className="text-[#666666] text-[11px] font-black uppercase tracking-widest">PIX • CARTÃO • BOLETO</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-[#FFF8FB] p-8 rounded-[2.5rem] border-2 border-[#F2DCE6] flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="w-20 h-20 flex-shrink-0 bg-[#FFFFFF] rounded-full border-4 border-[#E91E63] flex items-center justify-center text-[#E91E63] shadow-md">
            <ShieldAlert size={40} strokeWidth={2.5} />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-sm md:text-base font-black text-[#1E1E1E] uppercase tracking-tight mb-2 flex items-center justify-center md:justify-start gap-2">
              <span>🛡️</span> GARANTIA INCONDICIONAL DE 7 DIAS
            </h4>
            <p className="text-[#666666] text-xs md:text-sm font-medium leading-relaxed mb-3">
              Você pode acessar todo o conteúdo, explorar o método e conhecer todas as ferramentas sem risco. Se dentro de 7 dias sentir que ele não era o que esperava, basta solicitar o reembolso e devolveremos 100% do valor pago.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-black text-[#E91E63]">
              <span className="bg-[#FFF1F6] px-3 py-1 rounded-full border border-[#F2DCE6]">Sem burocracia.</span>
              <span className="bg-[#FFF1F6] px-3 py-1 rounded-full border border-[#F2DCE6]">Sem perguntas.</span>
              <span className="bg-[#FFF1F6] px-3 py-1 rounded-full border border-[#F2DCE6]">Sem risco.</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] font-black text-[#9B9B9B] uppercase tracking-[0.2em] mt-8">
          <ShieldCheck size={18} className="text-[#22C55E]" /> 🔒 COMPRA 100% SEGURA E CRIPTOGRAFADA
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = [
    { 
      q: "POR ONDE EU RECEBO O MÉTODO MAKE LUCRATIVA?", 
      a: "Assim que o pagamento for aprovado, você recebe os dados de acesso imediatamente no seu e-mail cadastrado. Basta abrir no celular ou computador e começar a seguir o passo a passo." 
    },
    { 
      q: "NUNCA VENDI NADA. ESSE MÉTODO É PARA MIM?", 
      a: "Sim. O método foi criado justamente para quem está começando do zero. Você aprende o que fazer primeiro, quais produtos comprar, onde encontrar fornecedores e como fazer suas primeiras vendas, mesmo sem experiência." 
    },
    { 
      q: "PRECISO TER MUITO DINHEIRO PARA COMEÇAR?", 
      a: "Não. O método mostra como montar sua loja em casa começar com apenas R$100, comprando os produtos certos e evitando gastar dinheiro com itens que podem ficar parados." 
    },
    { 
      q: "O MÉTODO ENSINA APENAS ONDE COMPRAR OS PRODUTOS?", 
      a: "Não. Além da lista de fornecedores selecionados, você recebe um passo a passo completo, lista dos produtos que mais vendem, calculadora automática de lucro, controle de estoque, textos prontos para divulgação e ferramentas para organizar sua loja." 
    },
    { 
      q: "POR QUANTO TEMPO TEREI ACESSO?", 
      a: "O acesso é seu para consultar sempre que precisar. Você poderá abrir o método sempre que quiser para revisar o passo a passo, utilizar as ferramentas e acompanhar o crescimento da sua loja." 
    },
    { 
      q: "E SE EU NÃO GOSTAR DO CONTEÚDO?", 
      a: "Você tem 7 dias de garantia. Se dentro desse período entender que o método não é para você, basta solicitar o reembolso e devolveremos 100% do valor pago." 
    },
    { 
      q: "POSSO ACESSAR PELO CELULAR?", 
      a: "Sim. O método foi desenvolvido para ser utilizado diretamente pelo celular, de forma simples e intuitiva, para que você possa acompanhar cada etapa de onde estiver." 
    },
    { 
      q: "VOU RECEBER ATUALIZAÇÕES DO MÉTODO?", 
      a: "Sim. Sempre que houver melhorias ou novos conteúdos incluídos no método, você poderá acessar a versão atualizada sem precisar comprar novamente." 
    }
  ];

  return (
    <section className="py-16 bg-[#FFF8FB] px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[#1E1E1E] italic mb-2">
            PERGUNTAS FREQUENTES
          </h2>
          <p className="text-xs md:text-sm text-[#666666] font-medium max-w-lg mx-auto">
            Ainda ficou alguma dúvida? Veja as perguntas que mais recebemos de quem está começando do zero.
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="border border-[#F2DCE6] rounded-2xl overflow-hidden shadow-sm bg-[#FFFFFF]">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-[#FFFFFF] hover:bg-[#FFF8FB] transition-colors"
               >
                <span className="font-black text-[#1E1E1E] uppercase tracking-tight text-xs md:text-sm leading-relaxed pr-6">{item.q}</span>
                <ChevronDown size={18} className={`text-[#E91E63] flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {openIndex === i && (
                <div className="p-8 pt-0 text-xs md:text-sm text-[#555555] leading-relaxed font-medium bg-[#FFFFFF]">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="py-12 bg-[#1E1E1E] text-center px-6 border-t border-[#F2DCE6]/20">
    <div className="max-w-4xl mx-auto">
      <span className="text-white font-black text-xl tracking-tighter block uppercase italic mb-8">MÉTODO <span className="text-[#FF5C93]">MAKE LUCRATIVA</span></span>
      
      <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-[#9B9B9B] uppercase tracking-[0.4em] mb-12">
        <a href="#" className="hover:text-[#FF5C93] transition-colors">Privacidade</a>
        <a href="#" className="hover:text-[#FF5C93] transition-colors">Termos</a>
        <a href="#" className="hover:text-[#FF5C93] transition-colors">Contato</a>
      </div>

      <p className="text-[#9B9B9B] text-[10px] font-bold leading-relaxed max-w-xl mx-auto uppercase tracking-widest mb-10 opacity-80">
        Resultados podem variar. Este site não faz parte do Facebook Inc ou Google Inc. Toda informação é de nossa responsabilidade.
      </p>

      <div className="h-px w-16 bg-[#9B9B9B]/30 mx-auto mb-10" />
      
      <p className="text-[10px] font-black text-[#9B9B9B] uppercase tracking-[0.4em] mb-8">© 2026 MÉTODO MAKE LUCRATIVA • TODOS OS DIREITOS RESERVADOS</p>

      <div className="pt-8 border-t border-white/10">
        <p className="text-[#9B9B9B] text-[9px] font-black uppercase tracking-widest mb-4">© 2026 • Todos os direitos reservados.</p>
        <p className="text-[#9B9B9B] text-[9px] font-bold uppercase tracking-widest opacity-60 leading-relaxed max-w-2xl mx-auto mb-4">
          Todo o conteúdo presente nesta página, incluindo textos, imagens, design, estrutura, vídeos, materiais e quaisquer outros elementos, é protegido por leis de direitos autorais e propriedade intelectual.
        </p>
        <p className="text-[#9B9B9B] text-[9px] font-bold uppercase tracking-widest opacity-40 leading-relaxed max-w-2xl mx-auto">
          É proibida a reprodução, cópia, distribuição ou modificação, total ou parcial, sem autorização prévia por escrito do responsável. O uso indevido do conteúdo poderá resultar em medidas legais conforme a legislação vigente.
        </p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF8FB] text-[#1E1E1E] selection:bg-[#FFF1F6] selection:text-[#E91E63] antialiased overflow-x-hidden font-sans">
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Results />
      <Deliverables />
      <Pricing />
      <FAQ />
      <Specialist />
      <Footer />
      <ScarcityNotification />
    </div>
  );
};

export default App;
