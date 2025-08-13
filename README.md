# ZwenVoiceBot

by Zwen

Basit bir Discord botu. Ses kanalına katılarak `.mp3` dosyalarını çalabilir.  

---

## Özellikler
- `!gel` komutu ile kullanıcının bulunduğu ses kanalına katılır.
- `ses.mp3` dosyasını oynatır.
- Ses bittiğinde kanaldan otomatik çıkar.
- Basit ve anlaşılır kod yapısı, geliştirilmeye açık.

---

## Gereksinimler
- Node.js 16 veya üstü
- Discord bot tokeni
- ffmpeg (veya ffmpeg-static paketi)
- npm paketleri:
  ```bash
  npm install discord.js @discordjs/voice @discordjs/opus ffmpeg-static
