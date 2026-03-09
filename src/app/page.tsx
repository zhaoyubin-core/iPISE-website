"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动事件以改变导航栏颜色
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  // 决定导航栏当前是亮色（白底黑字）还是暗色（透明底白字）
  const isLightNav = isScrolled || activeMenu !== null;

  return (
    <main className="min-h-screen bg-white text-[#111] font-sans relative">
      
      {/* 遮罩层 - 当菜单打开时背景变暗 */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[73px] bg-black/40 z-40 backdrop-blur-sm"
            onMouseEnter={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* 动态智能导航栏 */}
      <div 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isLightNav 
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 text-[#111]' 
            : 'bg-gradient-to-b from-black/80 to-transparent border-b border-transparent text-white'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 py-4 relative z-50 bg-transparent">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold tracking-tighter cursor-pointer">iPISE</div>
          </div>
          
          <div className={`hidden md:flex items-center h-full gap-8 text-sm font-medium transition-colors ${isLightNav ? 'text-gray-600' : 'text-gray-200'}`}>
            <div 
              className={`cursor-pointer py-2 transition-colors ${activeMenu === 'printers' ? 'text-[#0071e3]' : isLightNav ? 'hover:text-black' : 'hover:text-white'}`}
              onMouseEnter={() => setActiveMenu('printers')}
            >
              3D打印机
            </div>
            <div 
              className={`cursor-pointer py-2 transition-colors ${activeMenu === 'materials' ? 'text-[#0071e3]' : isLightNav ? 'hover:text-black' : 'hover:text-white'}`}
              onMouseEnter={() => setActiveMenu('materials')}
            >
              打印耗材
            </div>
            <div 
              className={`cursor-pointer py-2 transition-colors ${activeMenu === 'applications' ? 'text-[#0071e3]' : isLightNav ? 'hover:text-black' : 'hover:text-white'}`}
              onMouseEnter={() => setActiveMenu('applications')}
            >
              应用领域
            </div>
            <div 
              className={`cursor-pointer py-2 transition-colors ${activeMenu === 'ecosystem' ? 'text-[#0071e3]' : isLightNav ? 'hover:text-black' : 'hover:text-white'}`}
              onMouseEnter={() => setActiveMenu('ecosystem')}
            >
              生态与服务
            </div>
            <a 
              href="#about" 
              className={`cursor-pointer py-2 transition-colors ${isLightNav ? 'hover:text-black' : 'hover:text-white'}`}
              onMouseEnter={() => setActiveMenu(null)}
            >
              关于团队
            </a>
          </div>

          <div className="flex gap-4">
            <a href="#contact" className="text-sm font-medium px-4 py-2 bg-[#0071e3] text-white rounded-full hover:bg-[#0077ed] transition-colors shadow-lg shadow-blue-500/30">联系我们</a>
          </div>
        </nav>

        {/* 下拉菜单动画层 (保持白底风格以确保图片清晰可见) */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="w-full bg-white overflow-hidden absolute top-full left-0 origin-top z-50 text-[#111]"
              style={{ boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
            >
              <div className="max-w-[1200px] mx-auto px-6 py-10 border-t border-gray-100">
                
                {/* 3D打印机 菜单内容 */}
                {activeMenu === 'printers' && (
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { src: "/assets/2正视图.jpg" },
                      { src: "/assets/4仰视图.jpg" },
                      { src: "/assets/5右侧关门.jpg" }
                    ].map((img, i) => (
                      <div key={i} className="group cursor-pointer text-center">
                        <div className="bg-[#f5f5f7] rounded-2xl p-4 h-40 flex items-center justify-center mb-4 overflow-hidden">
                          <div className="relative w-full h-full">
                            <Image src={img.src} alt="" fill className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 打印耗材 菜单内容 */}
                {activeMenu === 'materials' && (
                  <div className="grid grid-cols-3 gap-12 px-16">
                    {[
                      { src: "/assets/slide_2_img_13.png" },
                      { src: "/assets/slide_2_img_14.png" },
                      { src: "/assets/slide_2_img_25.png" }
                    ].map((item, i) => (
                      <div key={i} className="group cursor-pointer text-center">
                        <div className="bg-[#f5f5f7] rounded-2xl p-6 h-48 flex items-center justify-center mb-4 overflow-hidden">
                          <div className="relative w-full h-full">
                            <Image src={item.src} alt="" fill className="object-contain rounded-xl group-hover:scale-110 transition-transform duration-700" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 应用领域 菜单内容 */}
                {activeMenu === 'applications' && (
                  <div className="grid grid-cols-4 gap-6">
                    {[
                      { name: "精密光学", img: "/assets/slide_3_img_2.png" },
                      { name: "柔性传感", img: "/assets/slide_3_img_6.png" },
                      { name: "生物制造", img: "/assets/slide_3_img_8.png" },
                      { name: "个性智造", img: "/assets/slide_3_img_9.png" }
                    ].map((app, i) => (
                      <div key={i} className="group cursor-pointer text-center">
                        <div className="bg-[#f5f5f7] rounded-2xl p-4 h-40 flex items-center justify-center mb-4 overflow-hidden">
                          <div className="relative w-full h-full">
                            <Image src={app.img} alt={app.name} fill className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900">{app.name}</h4>
                      </div>
                    ))}
                  </div>
                )}

                {/* 生态与服务 菜单内容 */}
                {activeMenu === 'ecosystem' && (
                  <div className="flex justify-center gap-12">
                    <div className="group cursor-pointer text-center w-80">
                      <div className="bg-[#f5f5f7] rounded-2xl p-6 h-56 flex items-center justify-center mb-5 group-hover:bg-gray-100 transition-colors">
                        <div className="relative w-full h-full">
                          <Image src="/assets/slide_2_img_28.png" alt="MakeLight World" fill className="object-contain object-center group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-lg">MakeLight World</h4>
                      <p className="text-sm text-gray-500 mt-1">优质打印服务和免费模型库</p>
                    </div>
                  </div>
                )}

              </div>
              <div className="w-full h-4 bg-gradient-to-b from-gray-50/50 to-transparent"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hero Section - 带有黑色背景和巨大3D模型的大图效果 */}
      <section id="team" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white pt-20 pb-16">
        
        {/* 背景大图及入场动画 */}
        <motion.div 
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          {/* 这里使用了机器的大图作为背景 */}
          <Image 
            src="/assets/hero_background.jpg" 
            alt="Hero Background" 
            fill
            className="object-contain object-center opacity-40 md:opacity-50"
            priority
          />
          {/* 边缘暗化渐变，让文字更清晰，背景更融合 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
        </motion.div>

        {/* 团队文字介绍及逐级浮现动画 */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto mt-10">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm md:text-base font-semibold tracking-[0.2em] text-gray-400 mb-4 uppercase"
          >
            Innovative Research & Development
          </motion.h2>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
          >
            iPISE 团队
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-3xl text-gray-300 font-medium mb-12 max-w-3xl leading-relaxed"
          >
            专注于机器人视觉感知系统与异构光学器件设计制造的高新技术研发团队，重构制造可能。
          </motion.p>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-6"
          >
            <a href="#about" className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-semibold text-lg hover:scale-105 active:scale-95 transform duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              了解我们
            </a>
            <a href="#services" className="px-8 py-4 bg-transparent border border-gray-400 text-white rounded-full hover:bg-white/10 transition-colors font-semibold text-lg hover:border-white">
              查看服务
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="pt-24 pb-0 px-4 w-full mx-auto bg-white flex justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-[#a3b8cc] w-full max-w-[1000px]">
          
          {[
            { 
              title: "体积3D打印机", 
              desc: "创客的生产力工具", 
              link1: "立即购买", 
              link2: "产品对比",
              img: "/assets/slide_2_img_3.png" 
            },
            { 
              title: "体积打印耗材", 
              desc: "独家配置的体积3D耗材", 
              link1: "立即购买", 
              link2: "产品对比",
              img: "/assets/2.png" 
            },
            { 
              title: "MakeLight World", 
              desc: "优质打印服务和免费模型", 
              link1: "立即购买",
              link2: "产品对比", 
              img: "/assets/3.png" 
            },
            { 
              title: "畅想智造", 
              desc: "体积3D打印机的应用领域", 
              link1: "了解更多", 
              link2: null,
              img: "/assets/4.png" 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group bg-[#ffffff] pt-10 md:pt-14 px-6 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 hover:shadow-2xl min-h-[250px] md:min-h-[300px] border-[#a3b8cc] ${i % 2 === 0 ? 'lg:border-r' : ''} border-b`}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-1 text-[#333] tracking-normal">{item.title}</h3>
              <p className="text-2xl md:text-3xl text-[#222] font-extrabold mb-4 tracking-tighter" style={{ fontFamily: 'sans-serif' }}>{item.desc}</p>
              
              <div className="flex items-center gap-6 text-[#0066cc] text-base md:text-lg z-10 font-normal">
                <a href="#" className="flex items-center hover:underline group-hover:scale-105 transition-transform">{item.link1} &gt;</a>
                {item.link2 && (
                  <a href="#" className="flex items-center hover:underline group-hover:scale-105 transition-transform">{item.link2} &gt;</a>
                )}
              </div>
              
              <div className="relative w-full h-[180px] md:h-[250px] mt-6 flex-grow flex items-end justify-center">
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill
                  className="object-contain object-bottom scale-[0.9] group-hover:scale-[0.95] transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* About Section - 添加精美入场动画 */}
      <section id="about" className="py-24 px-6 md:px-12 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-12 text-black"
          >
            关于 iPISE 团队
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#f5f5f7] rounded-[40px] p-8 md:p-14 text-left shadow-lg hover:shadow-xl transition-shadow duration-500"
          >
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl">
              <p>
                <strong className="text-black font-semibold">iPISE 团队（无锡梅克莱特科技有限公司）</strong>，是一支专注于机器人视觉感知系统所需要的异构光学器件设计与制造的高新技术团队。
              </p>
              <p>
                团队依托自主知识产权的体积增材制造一体化工艺、特有光固化改性树脂材料配方以及在线自适应光学修正等核心技术，致力于开发由不同材质组成的具有非对称曲面结构的光学元件，旨在实现高折射率、轻量化及特定光路纠偏，应用于机器人的视觉传感器模组，提高空间环境识别的精度和广度，特别是针对具身智能所需的复杂场景建模。
              </p>
            </div>
            
            <div className="mt-12 p-6 md:p-8 bg-white rounded-3xl border border-gray-100 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-5"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-2xl shadow-inner">
                  🏆
                </div>
                <p className="text-lg font-medium text-gray-900">荣获国家大学生创新创业大赛银奖</p>
              </motion.div>
              <div className="w-full h-[1px] bg-gray-100"></div>
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-5"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-2xl shadow-inner">
                  ⚙️
                </div>
                <p className="text-lg font-medium text-gray-900 leading-snug">已完成第一款产品光学精度表面的高速体积制造装备样机，实现多个光学器件的快速制备。</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-6 md:px-12 bg-[#f5f5f7] border-t border-gray-200 text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          <div className="flex flex-col items-start gap-3">
            <div className="text-2xl font-bold text-black tracking-tighter mb-2">iPISE Team</div>
            <p className="text-gray-600">无锡梅克莱特科技有限公司</p>
            <div className="flex flex-col gap-2 mt-2">
              <p><span className="font-medium text-gray-700">电话：</span>18921376972</p>
              <p><span className="font-medium text-gray-700">邮箱：</span>654091943@qq.com</p>
              <p><span className="font-medium text-gray-700">地址：</span>无锡市滨湖区锦溪路97号A栋108-3室</p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-300 w-full md:w-auto">
              © {new Date().getFullYear()} iPISE团队 / 无锡梅克莱特科技有限公司 版权所有
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 font-medium">
            <div className="flex flex-col gap-4">
              <h4 className="text-black font-semibold mb-2">产品与服务</h4>
              <a href="#" className="hover:text-black transition-colors">体积3D打印机</a>
              <a href="#" className="hover:text-black transition-colors">专研打印耗材</a>
              <a href="#" className="hover:text-black transition-colors">MakeLight World</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-black font-semibold mb-2">应用领域</h4>
              <a href="#" className="hover:text-black transition-colors">精密光学</a>
              <a href="#" className="hover:text-black transition-colors">柔性传感</a>
              <a href="#" className="hover:text-black transition-colors">生物制造</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-black font-semibold mb-2">关于我们</h4>
              <a href="#" className="hover:text-black transition-colors">团队介绍</a>
              <a href="#" className="hover:text-black transition-colors">隐私政策</a>
              <a href="#" className="hover:text-black transition-colors">服务条款</a>
            </div>
          </div>
          
        </div>
      </footer>
    </main>
  );
}