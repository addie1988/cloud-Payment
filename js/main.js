// header_top
const header = document.getElementById('header');
const spacer = document.getElementById('spacer');

window.addEventListener('scroll', () => {
  if (window.scrollY > 90) {
    header.classList.add('fixed');
    spacer.classList.add('active'); // 防止內容跳動
  } else {
    header.classList.remove('fixed');
    spacer.classList.remove('active');
  }
});

// ----------------------------------------------------------------------------------------

// menu 漢堡選單
const hamburger = document.getElementById('hamburger'); // 取得漢堡選單按鈕
const navMenu = document.getElementById('nav-menu');     // 取得導覽選單

// 點擊漢堡按鈕時，切換導覽選單的顯示狀態
hamburger.addEventListener('click', (event) => {
  event.stopPropagation(); // 阻止事件冒泡，避免觸發 window 的點擊事件
  navMenu.classList.toggle('show'); // 切換 show 類別，顯示或隱藏選單
});

// 點擊導覽選單內部時，阻止事件冒泡，不會關閉選單
navMenu.addEventListener('click', (event) => {
  event.stopPropagation();
});

// 點擊畫面其他地方時，關閉導覽選單
window.addEventListener('click', () => {
  navMenu.classList.remove('show'); // 移除 show 類別，隱藏選單
});

// ----------------------------------------------------------------------------------------

// 錨點 scroll
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', (e) => {
    // 可自訂：GA 追蹤、動畫、console log 等
    console.log(`前往 ${link.getAttribute('href')}`);
  });
});

// ----------------------------------------------------------------------------------------

// language 語系
function toggleDropdown(event) {
  event.preventDefault();
  const menu = document.getElementById("dropdownMenu");
  menu.classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.closest('.dropdown-toggle')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }
  }
}

function changeLanguage(langCode) {
  // 關閉下拉選單
  document.getElementById('dropdownMenu').classList.remove('show');

  // 更新頂部圖示
  const topIcon = document.querySelector('.dropdown-toggle img');
  const newIconSrc = `./images/icon_${langCode === 'zh-CN' ? '1' :
    langCode === 'en' ? '2' :
      langCode === 'ja' ? '3' : '1'
    }.svg`;

  if (topIcon) {
    topIcon.src = newIconSrc;
    topIcon.alt = `icon_${langCode}`;
  }

  // 更新所有具有 data-i18n 的元素
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[langCode]?.[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.value = translations[langCode][key];
      } else {
        el.textContent = translations[langCode][key];
      }
    }
  });

  // 更新彈窗內容
  const blocks = document.querySelectorAll('.block');
  blocks.forEach(block => {
    const id = block.getAttribute('data-id');
    if (id) {
      const titleKey = `modal.${id}.title`;
      const contentKey = `modal.${id}.content`;
      if (translations[langCode]?.[titleKey]) {
        block.setAttribute('data-title', translations[langCode][titleKey]);
      }
      if (translations[langCode]?.[contentKey]) {
        block.setAttribute('data-content', translations[langCode][contentKey]);
      }
    }
  });

  // 設置 cookie
  document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.host}`;
  document.cookie = `googtrans=/en/${langCode}; path=/`;

  // 設置 <html lang="">
  document.documentElement.lang = langCode;
}

// 檢查當前語言並設置對應圖示
function setLanguageIcon() {
  const topIcon = document.querySelector('.dropdown-toggle img');
  if (!topIcon) return;

  // 從 cookie 獲取當前語言
  const cookie = document.cookie.split(';').find(c => c.trim().startsWith('googtrans='));
  let currentLang = 'zh-CN'; // 默認中文

  if (cookie) {
    const langCode = cookie.split('/')[2];
    currentLang = langCode;
  }

  // 設置對應圖示
  const newIconSrc = `./images/icon_${currentLang === 'zh-CN' ? '1' :
    currentLang === 'en' ? '2' :
      currentLang === 'ja' ? '3' : '1'
    }.svg`;

  topIcon.src = newIconSrc;
  topIcon.alt = `icon_${currentLang}`;

  // 初始化翻譯
  changeLanguage(currentLang);
}

// 頁面加載時執行
window.addEventListener('load', setLanguageIcon);

// Close dropdown menus when clicking outside
document.addEventListener('click', (event) => {
  // Close language dropdown
  const dropdownMenu = document.getElementById('dropdownMenu');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  if (dropdownMenu && !dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.remove('show');
  }

  // Close hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu && !hamburger.contains(event.target) && !navMenu.contains(event.target)) {
    navMenu.classList.remove('show');
  }
});

// ----------------------------------------------------------------------------------------

// 彈窗
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalIcon = document.getElementById('modalIcon');
const blocks = document.querySelectorAll('.block');

blocks.forEach(block => {
  block.addEventListener('click', () => {
    const id = block.getAttribute('data-id');
    const title = block.getAttribute('data-title');
    const content = block.getAttribute('data-content');
    const icon = block.getAttribute('data-icon');
    
    if (title && content) {
      // 设置标题
      modalTitle.textContent = title;
      
      // 设置内容，将换行符转换为HTML换行
      modalContent.innerHTML = content.replace(/\n/g, '<br>');
      
      // 设置图标
      modalIcon.src = icon;
      
      // 显示弹窗
      overlay.style.display = 'flex';
      header.style.position = 'relative';
      document.body.style.overflow = 'hidden';
      header.style.opacity = '0';
    }
  });
});

// 关闭按钮事件
closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  header.style.position = 'fixed';
  document.body.style.overflow = 'auto';
  header.style.opacity = '1';
});

// 点击遮罩层关闭
overlay.addEventListener('click', (e) => {
  if (!modal.contains(e.target)) {
    overlay.style.display = 'none';
    header.style.position = 'fixed';
    document.body.style.overflow = 'auto';
    header.style.opacity = '1';
  }
});

// ----------------------------------------------------------------------------------------

