// login.js
(function () {
    'use strict';

    const els = {
        apiKeyInput: document.getElementById('apiKeyInput'),
        loginBtn: document.getElementById('login-button'),
        rememberKey: document.getElementById('rememberKey'),
        showApikeyBtn: document.getElementById('show-apikey'),
        errorMsg: document.getElementById('loginError'),
        themeToggle: document.getElementById('loginThemeToggle'),
        iconMoon: document.getElementById('loginIconMoon'),
        iconSun: document.getElementById('loginIconSun'),
        versionLogin: document.getElementById('version-login'),
        versionBadge: document.getElementById('version-badge')
    };

    function safeLS(key, value) {
        try {
            if (value === undefined) return localStorage.getItem(key);
            if (value === null) localStorage.removeItem(key);
            else localStorage.setItem(key, value);
        } catch (e) { return null; }
    }

    function showError(msg) {
        els.errorMsg.textContent = msg;
        els.errorMsg.style.display = msg ? 'block' : 'none';
    }

    // 获取后台版本号
    async function fetchVersion() {
        try {
            const r = await fetch('/admin/version');
            const d = await r.json();
            if (d && d.version) {
                els.versionLogin.textContent = d.version;
                if (d.version.includes('-')) {
                    els.versionLogin.classList.add('is-pre');
                    els.versionBadge.classList.add('is-pre');
                }
            }
        } catch (e) { console.error('获取版本号失败', e); }
    }

    async function doLogin(key, isManual) {
        if (!key) return;
        els.loginBtn.disabled = true;
        els.loginBtn.textContent = '验证中…';
        showError('');

        try {
            const resp = await fetch('/api/status', { headers: { 'X-API-Key': key } });
            if (resp.status === 401) {
                if (isManual) showError('API 密钥错误');
                safeLS('subscheck_api_key', null);
                sessionStorage.removeItem('subscheck_session_key');
                // 自动聚焦输入框
                els.apiKeyInput.value = '';
                els.apiKeyInput.focus()
                return;
            }
            if (!resp.ok) {
                if (isManual) showError('服务器错误: ' + resp.status);
                // 自动聚焦输入框
                els.apiKeyInput.focus()
                return;
            }

            // 验证成功，保存 Session 供后续 API 使用
            sessionStorage.setItem('subscheck_session_key', key);
            sessionStorage.setItem('subscheck_api_key', key);
            if (els.rememberKey.checked) safeLS('subscheck_api_key', key);

            document.cookie = `scp_api_key=${encodeURIComponent(key)}; path=/; max-age=2592000`;
            window.location.replace('/admin');

        } catch (e) {
            if (isManual) showError('网络请求失败');
            // 自动聚焦输入框
            els.apiKeyInput.focus()
        } finally {
            els.loginBtn.disabled = false;
            els.loginBtn.textContent = '进入管理界面';
        }
    }

    els.loginBtn.addEventListener('click', () => doLogin(els.apiKeyInput.value.trim(), true));
    els.apiKeyInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(els.apiKeyInput.value.trim(), true); });

    els.showApikeyBtn.addEventListener('click', () => {
        const isPwd = els.apiKeyInput.type === 'password';
        els.apiKeyInput.type = isPwd ? 'text' : 'password';
        els.showApikeyBtn.textContent = isPwd ? '隐藏' : '显示';
        els.showApikeyBtn.classList.toggle('active', isPwd);
    });

    els.apiKeyInput.addEventListener('input', () => {
        els.showApikeyBtn.classList.toggle('visible', els.apiKeyInput.value.length > 0);
    });

    // 主题与动画逻辑
    const applyTheme = t => {
        document.documentElement.setAttribute('data-theme', t);
        els.iconMoon.style.display = t === 'dark' ? '' : 'none';
        els.iconSun.style.display = t === 'light' ? '' : 'none';
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#18191b' : '#ffffff');
    };
    const initTheme = () => {
        const t = localStorage.getItem('scp_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        applyTheme(t);
    };
    els.themeToggle.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('scp_theme', next);
        applyTheme(next);
    });

    function initLoginAnimation() {
        const cv = document.getElementById('login-cv');
        const ctx = cv?.getContext('2d');
        if (!ctx) return;
        let W, H, P = [];
        function resize() {
            W = cv.width = window.innerWidth; H = cv.height = window.innerHeight;
            P = Array.from({ length: 40 }, () => ({
                x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
                r: Math.random() * 2 + 1.5, ba: Math.random() * 0.3 + 0.3, ph: Math.random() * Math.PI * 2
            }));
        }
        resize(); window.addEventListener('resize', resize);
        function loop(ts) {
            ctx.clearRect(0, 0, W, H);
            const gb = .8 + .2 * (.5 - .5 * Math.cos(2 * Math.PI * ts / 5000));
            for (const p of P) { p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H; }
            ctx.lineWidth = 0.4;
            for (let i = 0; i < 40; i++) {
                for (let j = i + 1; j < 40; j++) {
                    const d = Math.sqrt((P[i].x - P[j].x) ** 2 + (P[i].y - P[j].y) ** 2);
                    if (d < 120) {
                        ctx.strokeStyle = `rgba(14,165,160,${(.9 * (1 - d / 120) * gb).toFixed(3)})`;
                        ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y); ctx.stroke();
                    }
                }
            }
            for (const p of P) {
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(14,165,160,${(p.ba * (.72 + .28 * Math.sin(ts * .0011 + p.ph)) * gb).toFixed(2)})`; ctx.fill();
            }
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }

    // 启动
    initTheme();
    initLoginAnimation();
    fetchVersion();

    // 自动聚焦输入框
    els.apiKeyInput.focus()

    // 检查自动登录
    const savedKey = sessionStorage.getItem('subscheck_session_key') || safeLS('subscheck_api_key');
    if (savedKey) {
        els.apiKeyInput.value = savedKey;
        doLogin(savedKey, false);
    }
})();