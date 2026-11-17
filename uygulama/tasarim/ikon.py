# Uygulama ikonu: başlangıç ekranındaki kart ızgarasının küçük bir hali.
# ikon.svg       -> mağaza ikonu / eski tip ikon (arka planlı)
# ikon-on.svg    -> uyarlanabilir ikonun ön katmanı (şeffaf, güvenli alana sığdırılmış)
import sys
BG = '#141517'
def grid(side):
    g = side * 0.06; c = (side - g) / 2; bar = c * 0.11; s = []
    cols = ['#ffc61a', '#7af6ff', '#ff4fd8', '#8bd450']; lines = [0.58, 0.5, 0.46, 0.62]
    for i in range(4):
        x = (i % 2) * (c + g); y = (i // 2) * (c + g)
        s.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{c:.1f}" height="{c:.1f}" fill="#1d1f22" stroke="#3a3c40" stroke-width="{side*0.009:.1f}"/>')
        s.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{bar:.1f}" height="{c:.1f}" fill="{cols[i]}"/>')
        s.append(f'<rect x="{x+bar+c*0.13:.1f}" y="{y+c*0.62:.1f}" width="{c*lines[i]:.1f}" height="{c*0.12:.1f}" fill="#eceae4"/>')
        s.append(f'<rect x="{x+bar+c*0.13:.1f}" y="{y+c*0.18:.1f}" width="{c*0.16:.1f}" height="{c*0.07:.1f}" fill="{cols[i]}"/>')
    return '\n'.join(s)
def svg(scale, bg):
    side = 1024 * scale; o = (1024 - side) / 2
    back = f'<rect width="1024" height="1024" fill="{BG}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">{back}<g transform="translate({o:.1f} {o:.1f})">{grid(side)}</g></svg>\n'
open('ikon.svg', 'w').write(svg(0.60, True))
open('ikon-on.svg', 'w').write(svg(0.46, False))
