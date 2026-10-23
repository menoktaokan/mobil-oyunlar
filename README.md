# Mobil Oyunlar

Telefonda dikey ekranda oynanmak üzere yapılmış tarayıcı oyunları. Her oyun tek bir HTML dosyasıdır: kurulum, derleme ya da sunucu gerekmez. Rekorlar ve ayarlar tarayıcının yerel deposunda (localStorage) tutulur.

## Oyunlar

| Oyun | Tür | Klasör |
|---|---|---|
| Hurda Arena | Arena tank savaşı | [`hurda-arena/`](hurda-arena/) |
| Yörünge Avcısı | Uzay nişancısı | [`yorunge-avcisi/`](yorunge-avcisi/) |
| Menzil 600 | Keskin nişancı | [`menzil-600/`](menzil-600/) |
| Fener Kalesi | Kule savunması | [`fener-kalesi/`](fener-kalesi/) |
| Otoban 84 | Retro trafik yarışı | [`otoban-84/`](otoban-84/) |
| Çini Kırma | Tuğla kırma | [`cini-kirma/`](cini-kirma/) |
| Akide Patlat | Balon patlatma | [`akide-patlat/`](akide-patlat/) |
| Göktaşı | Göktaşı avı | [`goktasi/`](goktasi/) |
| İniş Penceresi | Ay'a iniş | [`inis-penceresi/`](inis-penceresi/) |
| Lunapark Pinball | Pinball | [`lunapark-pinball/`](lunapark-pinball/) |

## Oynamak

- **Çevrimiçi:** GitHub Pages açıkken `https://fundasarikaya.github.io/mobil-oyunlar/` adresinden oyun seçilir.
- **Yerelde:** Herhangi bir oyunun `index.html` dosyasını tarayıcıda açmak yeterli.

Her oyunun menüsünde **Kılavuz** bölümü nasıl oynandığını anlatır.

## Yapı

```
index.html            oyun seçme sayfası
<oyun>/index.html     oyunun kendisi (HTML + CSS + JS tek dosyada)
```

Yazı tipleri Google Fonts'tan yüklenir; bağlantı yoksa sistem yazı tipine düşer. Sesler WebAudio ile anlık üretilir, harici ses dosyası yoktur.
