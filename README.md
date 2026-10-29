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
| Sazlık Avı | Ördek avı | [`sazlik-avi/`](sazlik-avi/) |
| Hurda Arena Seviyeli | Arena tank savaşı, Kolay / Orta / Zor | [`hurda-arena-seviyeli/`](hurda-arena-seviyeli/) |
| Mahalle Kedisi | Labirent kaçışı | [`mahalle-kedisi/`](mahalle-kedisi/) |
| Fener Kalesi 2.5D | Kule savunması, gölgeli kuleler | [`fener-kalesi-25d/`](fener-kalesi-25d/) |
| Fener Kalesi 3D Kuleler | Kule savunması, 3d model kuleler | [`fener-kalesi-3dk/`](fener-kalesi-3dk/) |
| Fener Kalesi 3D | Kule savunması, tamamen 3d sahne | [`fener-kalesi-3d/`](fener-kalesi-3d/) |

## Oynamak

- **Çevrimiçi:** GitHub Pages açıkken `https://menoktaokan.github.io/mobil-oyunlar/` adresinden oyun seçilir.
- **Yerelde:** Herhangi bir oyunun `index.html` dosyasını tarayıcıda açmak yeterli.

Sazlık Avı dışındaki oyunların menüsünde **Kılavuz** bölümü nasıl oynandığını anlatır; Sazlık Avı kuralları başlangıç ekranında yazar.

## Yapı

```
index.html            oyun seçme sayfası
<oyun>/index.html     oyunun kendisi (HTML + CSS + JS tek dosyada)
```

Yazı tipleri Google Fonts'tan yüklenir; bağlantı yoksa sistem yazı tipine düşer. Sesler WebAudio ile anlık üretilir, harici ses dosyası yoktur.
