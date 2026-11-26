const form = document.getElementById("calculatorForm");
const calendarGrid = document.getElementById("calendarGrid");
const badgeSelectedDate = document.getElementById("badgeSelectedDate");
const displayTotalPrice = document.getElementById("displayTotalPrice");

const costSpace = document.getElementById("costSpace");
const rowWeekend = document.getElementById("rowWeekend");
const costWeekend = document.getElementById("costWeekend");
const rowDuration = document.getElementById("rowDuration");
const costDuration = document.getElementById("costDuration");
const costServices = document.getElementById("costServices");
const rowDiscount = document.getElementById("rowDiscount");
const costDiscount = document.getElementById("costDiscount");

const modal = document.getElementById("reservationModal");
const modalContactForm = document.getElementById("modalContactForm");
let botaoQueAbriu = null;

// calendário de outubro/2026 (dia 1 cai numa quinta)
const occupiedDays = [3, 10, 24, 31];
const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const firstDayOffset = 4;
const daysInMonth = 31;

const state = {
  selectedDate: 17,
  selectedDayName: "Sábado",
  isWeekend: true,
  finalTotal: 0
};

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// retorna a opção marcada de um grupo de radio
function marcado(nome) {
  return form.querySelector(`input[name="${nome}"]:checked`);
}

function renderCalendar() {
  for (let i = 0; i < firstDayOffset; i++) {
    const vazio = document.createElement("span");
    vazio.setAttribute("aria-hidden", "true");
    calendarGrid.appendChild(vazio);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayOfWeek = (firstDayOffset + day - 1) % 7;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
    const isOccupied = occupiedDays.includes(day);

    const dayBtn = document.createElement("button");
    dayBtn.type = "button";
    dayBtn.className = "calendar-day " + (isOccupied ? "occupied" : "available");
    if (isWeekend) dayBtn.classList.add("weekend-day");
    dayBtn.textContent = day;
    dayBtn.dataset.day = day;

    let descricao = `${day} de outubro, ${dayNames[dayOfWeek]}`;
    if (isWeekend) descricao += ", fim de semana";
    if (isOccupied) descricao += ", já reservado";
    dayBtn.setAttribute("aria-label", descricao);

    if (isOccupied) {
      dayBtn.disabled = true;
    } else {
      dayBtn.setAttribute("aria-pressed", day === state.selectedDate);
      dayBtn.addEventListener("click", () => {
        state.selectedDate = day;
        state.selectedDayName = dayNames[dayOfWeek];
        state.isWeekend = isWeekend;

        // só troca a marcação, sem redesenhar o calendário (assim o foco não se perde)
        calendarGrid.querySelectorAll('[aria-pressed="true"]').forEach((b) => b.setAttribute("aria-pressed", "false"));
        dayBtn.setAttribute("aria-pressed", "true");
        calculateTotal();
      });
    }

    calendarGrid.appendChild(dayBtn);
  }
}

function calculateTotal() {
  const espaco = marcado("espaco");
  const duracao = marcado("duracao");
  const convidados = marcado("convidados");
  const pagamento = marcado("pagamento");

  const spaceCost = parseFloat(espaco.dataset.price);
  const guests = parseInt(convidados.value);
  const extraHoursPrice = parseFloat(duracao.dataset.extra);
  const weekendSurcharge = state.isWeekend ? spaceCost * 0.2 : 0;

  // buffet e açaí são por convidado, DJ e cabine têm valor fixo
  let servicesCost = 0;
  form.querySelectorAll('input[name="servicos"]:checked').forEach((s) => {
    if (s.dataset.perGuest) {
      servicesCost += parseFloat(s.dataset.perGuest) * guests;
    } else {
      servicesCost += parseFloat(s.dataset.fixed);
    }
  });

  const subtotal = spaceCost + weekendSurcharge + extraHoursPrice + servicesCost;
  const discountVal = subtotal * parseFloat(pagamento.dataset.discount);
  state.finalTotal = subtotal - discountVal;

  displayTotalPrice.textContent = formatBRL(state.finalTotal);
  badgeSelectedDate.textContent = `${state.selectedDate} de Outubro`;
  costSpace.textContent = formatBRL(spaceCost);
  costServices.textContent = formatBRL(servicesCost);

  rowWeekend.classList.toggle("hidden", !state.isWeekend);
  costWeekend.textContent = "+ " + formatBRL(weekendSurcharge);

  rowDuration.classList.toggle("hidden", extraHoursPrice === 0);
  costDuration.textContent = "+ " + formatBRL(extraHoursPrice);

  rowDiscount.classList.toggle("hidden", discountVal === 0);
  costDiscount.textContent = "- " + formatBRL(discountVal);

  displayTotalPrice.classList.add("price-update-pulse");
  setTimeout(() => displayTotalPrice.classList.remove("price-update-pulse"), 300);
}

form.addEventListener("change", calculateTotal);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  calculateTotal();
  displayTotalPrice.scrollIntoView({ behavior: "smooth", block: "center" });
});

// janela de reserva
function openModal(e) {
  botaoQueAbriu = e.currentTarget;

  document.getElementById("modalDate").textContent = `${state.selectedDate} de Outubro (${state.selectedDayName})`;
  document.getElementById("modalSpace").textContent = `${marcado("espaco").dataset.name} (${marcado("tipo").value})`;
  document.getElementById("modalGuests").textContent = `${marcado("convidados").dataset.label} convidados · ${marcado("duracao").value}h`;
  document.getElementById("modalTotal").textContent = formatBRL(state.finalTotal);

  modal.showModal();
  document.getElementById("inputName").focus();
}

document.getElementById("btnReserveTopCTA").addEventListener("click", openModal);
document.getElementById("btnFormalProposal").addEventListener("click", openModal);
document.getElementById("btnCloseModal").addEventListener("click", () => modal.close());

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});

modal.addEventListener("close", () => {
  if (botaoQueAbriu) botaoQueAbriu.focus();
});

// só chega aqui se o navegador aprovar os campos (required, minlength e pattern)
modalContactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("inputName").value.trim();
  const phone = document.getElementById("inputPhone").value.trim();
  const notes = document.getElementById("formNotes").value.trim() || "Nenhuma";

  const servicos = [];
  form.querySelectorAll('input[name="servicos"]:checked').forEach((s) => servicos.push(s.dataset.name));

  let pagamento = "Parcelado no cartão";
  if (marcado("pagamento").value === "pix") pagamento = "À vista no PIX (10% de desconto)";

  let data = `${state.selectedDate} de outubro de 2026 (${state.selectedDayName})`;
  if (state.isWeekend) data += " - fim de semana";

  const message =
`Olá! Gostaria de uma proposta para o meu evento no Bem Me Quer.

Data: ${data}
Espaço: ${marcado("espaco").dataset.name}
Evento: ${marcado("tipo").value}
Convidados: ${marcado("convidados").dataset.label}
Duração: ${marcado("duracao").value} horas
Serviços: ${servicos.length > 0 ? servicos.join(", ") : "nenhum"}
Pagamento: ${pagamento}
Valor estimado: ${formatBRL(state.finalTotal)}

Nome: ${name}
WhatsApp: ${phone}
Observações: ${notes}`;

  const whatsappNumber = "5561999999999"; // TODO: colocar o número do espaço
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
  modal.close();
});

// se veio do botão "Simular orçamento do Garden/da Villa", já marca o espaço
const espacoUrl = new URLSearchParams(window.location.search).get("espaco");
if (["villa", "garden", "combo"].includes(espacoUrl)) {
  form.querySelector(`input[name="espaco"][value="${espacoUrl}"]`).checked = true;
}

renderCalendar();
calculateTotal();
