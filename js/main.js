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
  const newIconSrc = `./images/icon_${langCode === 'en' ? '1' :
    langCode === 'zh-CN' ? '2' :
      langCode === 'ja' ? '3' :
        langCode === 'pt' ? '4' : '1'
    }.svg`;

  if (topIcon) {
    topIcon.src = newIconSrc;
    topIcon.alt = `icon_${langCode}`;
  }

  // 設置 cookie
  document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.host}`;
  document.cookie = `googtrans=/en/${langCode}; path=/`;

  // 重新加載翻譯
  location.reload();
}

// 檢查當前語言並設置對應圖示
function setLanguageIcon() {
  const topIcon = document.querySelector('.dropdown-toggle img');
  if (!topIcon) return;

  // 從 cookie 獲取當前語言
  const cookie = document.cookie.split(';').find(c => c.trim().startsWith('googtrans='));
  let currentLang = 'en'; // 默認英文

  if (cookie) {
    const langCode = cookie.split('/')[2];
    currentLang = langCode;
  }

  // 設置對應圖示
  const newIconSrc = `./images/icon_${currentLang === 'en' ? '1' :
    currentLang === 'zh-CN' ? '2' :
      currentLang === 'ja' ? '3' :
        currentLang === 'pt' ? '4' : '1'
    }.svg`;

  topIcon.src = newIconSrc;
  topIcon.alt = `icon_${currentLang}`;
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

const contentData = {
  1: {
    title: '安全交易保障',
    content: '在线即时确认，确保每笔交易都经过交易双方本人确认。\n保留最完整的交易记录，协助您监控可疑交易，为您的资金安全构建坚实防线。',
    icon: '../images/tick_2.png'
  },
  2: {
    title: '企业与用户间提现即时到账',
    content: `我们拥有稳定的运作机制与全天候的接单团队，让用户无论何时提现，都能迅速到账，确保资金灵活运用不受阻。

- 秒速收付：资金即时到账，再也不必等待。
- 实时通知：交易完成立即收到通知，随时掌握资金动向。
- 交易记录一目了然：清晰直观的交易流水，轻松管理财务。`,
    icon: '../images/tick_2.png'
  },
  3: {
    title: '操作简单、界面直觉',
    content: `无论是新用户还是有经验的操作者，都能快速上手。简洁清晰的操作流程，从注册、充值到支付，每一步都流畅自然。

- 自动媒合：一键自动搓合买卖，免去寻找买家或卖家的繁琐过程。
- 在线交易：买卖双方在线即时交易，大幅节省等待时间。`,
    icon: '../images/tick_2.png'
  },
  4: {
    title: '24小时在线服务 + AI 智能客服支持',
    content: `内建智能客服系统，能即时回应用户常见问题，并在需要时引导至人工客服，让问题更快解决，无论何时何地，CloudPay都是您可靠的支付伙伴。

- 全天候客服支持
- 智能问答系统即刻解决常见问题
- 专业团队提供技术支持与业务咨询`,
    icon: '../images/tick_2.png'
  },
  5: {
    title: '买卖即时沟通',
    content: `内建沟通功能，让交易双方可以：

- 无缝对接交易细节
- 解决支付疑问
- 建立信任关系
- 提高交易成功率`,
    icon: '../images/tick_2.png'
  },
  6: {
    title: '稳定的云端系统架构',
    content: '采用高效云端架构，支持高频交易与大量同时在线，保证平台即使在高峰期也能稳定运作。',
    icon: '../images/tick_2.png'
  },
  7: {
    title: '多元支付方式支持',
    content: '云支付整合多种充值与提现方式，包含支付宝、微信、银行卡，全面满足用户不同的支付习惯。',
    icon: '../images/tick_2.png'
  },
  8: {
    title: '成本更低、收费透明',
    content: `个人用户享受零手续费体验，不论是充值、转账或提现，皆可无负担地使用云支付各项功能。  

对于商户与企业，我们提供极具竞争力的交易费率，协助降低整体运营成本，并搭配灵活的手续费方案，满足不同规模与行业需求。

- 低费率高效益
- 简单快速的系统接入
- 专业的商户后台管理工具
- 数据分析助力业务增长`,
    icon: '../images/tick_2.png'
  },
  9: {
    title: '完整的安全机制',
    content: '云支付导入多层防护，包括加密传输、多重验证等技术，并遵循国际支付安全规范，让每一笔交易都安心无忧。',
    icon: '../images/tick_2.png'
  },
  10: {
    title: '弹性的功能整合',
    content: '支持多样化的应用场景：包括订阅付费、积分活动、红利计划与第三方系统串接，轻松融入企业现有生态系统，扩展更多可能性。',
    icon: '../images/tick_2.png'
  }
};

blocks.forEach(block => {
  block.addEventListener('click', () => {
    const id = block.getAttribute('data-id');
    const data = contentData[id];
    if (data) {
      modalTitle.textContent = data.title;
      modalContent.textContent = data.content;
      modalIcon.src = data.icon;
      overlay.style.display = 'flex';
      header.style.position = 'relative';
      // 禁止背景滾動
      document.body.style.overflow = 'hidden';
      // 隱藏 header
      header.style.opacity = '0';
    }
  });
});

closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  header.style.position = 'fixed';
  // 恢復背景滾動
  document.body.style.overflow = 'auto';
  // 顯示 header
  header.style.opacity = '1';
});

overlay.addEventListener('click', (e) => {
  if (!modal.contains(e.target)) {
    overlay.style.display = 'none';
    header.style.position = 'fixed';
    // 恢復背景滾動
    document.body.style.overflow = 'auto';
    // 顯示 header
    header.style.opacity = '1';
  }
});

// ----------------------------------------------------------------------------------------

