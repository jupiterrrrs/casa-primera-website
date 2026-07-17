import re

# --- Navbar.tsx ---
path = "src/app/components/Navbar.tsx"
with open(path) as f:
    content = f.read()

old = '''      src="/images/logo-mark.png"
      alt="Casa Primera Hotspring Resorts logo"
      width={48}
      height={48}
      className="rounded-full object-cover"
      style={{ width: 48, height: 48, filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.35))" }}'''
new = '''      src="/images/logo-transparent.png"
      alt="Casa Primera Hotspring Resorts logo"
      className="object-contain"
      style={{ height: 40, width: "auto", filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.35))" }}'''

if old in content:
    content = content.replace(old, new)
    with open(path, "w") as f:
        f.write(content)
    print("Navbar.tsx updated")
else:
    print("Navbar.tsx: pattern not found, no changes made (check manually)")

# --- HeroCarousel.tsx ---
path = "src/app/components/HeroCarousel.tsx"
with open(path) as f:
    content = f.read()

old = '''          className="mb-5 rounded-full flex items-center justify-center mx-auto"
          style={{
            width: "clamp(140px, 20vw, 220px)",
            height: "clamp(140px, 20vw, 220px)",
            padding: "10px",
          }}
        >
          <img
            src="/images/logo-mark.png"
            alt="Casa Primera Hotspring Resorts logo"
            className="w-full h-full object-cover rounded-full"'''
new = '''          className="mb-5 flex items-center justify-center mx-auto"
          style={{
            width: "clamp(220px, 34vw, 340px)",
            height: "clamp(75px, 11vw, 115px)",
          }}
        >
          <img
            src="/images/logo-transparent.png"
            alt="Casa Primera Hotspring Resorts logo"
            className="w-full h-full object-contain"'''

if old in content:
    content = content.replace(old, new)
    with open(path, "w") as f:
        f.write(content)
    print("HeroCarousel.tsx updated")
else:
    print("HeroCarousel.tsx: pattern not found, no changes made (check manually)")