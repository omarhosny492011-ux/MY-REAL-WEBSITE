/* ========= PRODUCTS: EDIT / ADD YOURS ========= */
const products = [
  {id:1, name:"Linen shirt",     sub:"Sage",     price:1850, cat:"tops",    bg:"#c9d3c4", fg:"#4f6652", shape:"top"},
  {id:2, name:"Ribbed knit top", sub:"Stone",    price:1250, cat:"tops",    bg:"#dcd8d0", fg:"#8c8575", shape:"top"},
  {id:3, name:"Wrap dress",      sub:"Midnight", price:3400, cat:"dresses", bg:"#2d3b36", fg:"#16201c", shape:"dress"},
  {id:4, name:"Slip dress",      sub:"Brass",    price:2950, cat:"dresses", bg:"#d9c9a3", fg:"#a8905a", shape:"dress"},
  {id:5, name:"Camel coat",      sub:"Camel",    price:8900, cat:"outer",   bg:"#cdb78f", fg:"#9c8559", shape:"coat"},
  {id:6, name:"Oversized blazer",sub:"Charcoal", price:5200, cat:"outer",   bg:"#aeb6b1", fg:"#46524c", shape:"coat"},
  {id:7, name:"Cotton tee",      sub:"White",    price:850,  cat:"tops",    bg:"#e4e2dc", fg:"#ffffff", shape:"top"},
  {id:8, name:"Pleated midi",    sub:"Olive",    price:2700, cat:"dresses", bg:"#b9bfa3", fg:"#6d7556", shape:"dress"}
];

/* simple garment silhouettes (replace with real photos: <img src="photo.jpg">) */
const shapes = {
  top:  c=>`<svg viewBox="0 0 120 130"><path d="M40 10 Q60 24 80 10 L112 32 L98 54 L88 48 V120 H32 V48 L22 54 L8 32Z" fill="${c}"/></svg>`,
  dress:c=>`<svg viewBox="0 0 120 150"><path d="M42 8 Q60 22 78 8 L84 50 L102 142 H18 L36 50Z" fill="${c}"/></svg>`,
  coat: c=>`<svg viewBox="0 0 120 150"><path d="M40 8 L60 30 L80 8 L112 30 L106 56 L94 50 L98 142 H22 L26 50 L14 56 L8 30Z" fill="${c}"/><path d="M60 30 V142" stroke="rgba(0,0,0,.18)" stroke-width="2"/></svg>`
};

const money = n => "EGP " + n.toLocaleString("en-US");
const $ = s => document.querySelector(s);
let cart = [];

/* render grid */
function renderGrid(){
  $("#grid").innerHTML = products.map(p => `
    <article class="card" data-cat="${p.cat}">
      <div class="shot" style="background:${p.bg}">
        ${shapes[p.shape](p.fg)}
        <button class="add" data-id="${p.id}">Add to bag</button>
      </div>
      <div class="info"><span>${p.name}</span><span>${money(p.price)}</span></div>
      <div class="sub">${p.sub}</div>
    </article>`).join("");
}

/* filters */
$("#filters").addEventListener("click", e => {
  const b = e.target.closest("button"); if(!b) return;
  document.querySelectorAll("#filters button").forEach(x => x.classList.toggle("on", x === b));
  document.querySelectorAll(".card").forEach(c =>
    c.classList.toggle("hide", b.dataset.f !== "all" && c.dataset.cat !== b.dataset.f));
});

/* cart */
$("#grid").addEventListener("click", e => {
  const b = e.target.closest(".add"); if(!b) return;
  cart.push(products.find(p => p.id == b.dataset.id));
  renderCart();
  b.textContent = "Added ✓";
  setTimeout(() => b.textContent = "Add to bag", 1200);
});

function renderCart(){
  $("#count").textContent = cart.length;
  $("#total").textContent = money(cart.reduce((s,p) => s + p.price, 0));
  $("#items").innerHTML = cart.length
    ? cart.map((p,i) => `
      <div class="row">
        <i style="background:${p.bg}"></i>
        <div>${p.name}<small>${p.sub} · ${money(p.price)}</small></div>
        <button data-i="${i}">Remove</button>
      </div>`).join("")
    : `<p class="empty">Your bag is empty. Pick something from the collection.</p>`;
}

$("#items").addEventListener("click", e => {
  const b = e.target.closest("button[data-i]"); if(!b) return;
  cart.splice(+b.dataset.i, 1);
  renderCart();
});

const toggle = v => document.body.classList.toggle("open", v);
$("#openCart").onclick = () => toggle(true);
$("#closeCart").onclick = $("#shade").onclick = () => toggle(false);
document.addEventListener("keydown", e => e.key === "Escape" && toggle(false));
$("#checkout").onclick = e => { e.preventDefault(); alert("Demo only: checkout is not connected."); };

/* newsletter */
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  $("#msg").textContent = "Thank you. You're on the list.";
  e.target.reset();
});

/* nav background on scroll */
const hdr = $("#top");
addEventListener("scroll", () => hdr.classList.toggle("solid", scrollY > 40), {passive:true});

renderGrid();
renderCart();