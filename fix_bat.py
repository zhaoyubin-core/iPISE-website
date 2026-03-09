import io

content = """@echo off
color 0A
title MakeLight 网站 - 启动程序

echo ===================================================
echo.
echo               启动 MakeLight 网站
echo.
echo ===================================================
echo.

echo [1/3] 进入项目目录...
cd /d "%~dp0web"

echo [2/3] 正在检查依赖...
if not exist node_modules (
    echo 初次运行或依赖丢失，正在安装依赖包 (可能需要几分钟)...
    call npm install --registry=https://registry.npmmirror.com
)

echo.
echo [3/3] 正在启动服务器...
echo 提示：稍后浏览器会自动打开。如果没打开，请手动访问 http://localhost:3000
echo.
echo ===================================================
echo   服务运行中... (按 Ctrl+C 可以停止服务并退出)
echo ===================================================

REM 使用 ping 命令制造约 4 秒的延迟，然后再启动浏览器
start "" cmd /c "ping 127.0.0.1 -n 5 > nul && start http://localhost:3000"

REM 启动 Next.js 开发服务器
set PORT=3000
call npm run dev

pause
"""

# 使用 GBK 编码（中国地区 Windows 默认编码），这是 .bat 文件最稳定的兼容格式
with io.open("启动网站.bat", "w", encoding="gbk", newline="\r\n") as f:
    f.write(content)
