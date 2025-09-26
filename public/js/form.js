document.getElementById("formEmail").addEventListener("submit", async (e) => {
  e.preventDefault();

  const emissor = document.getElementById("emissor").value;
  const assunto = document.getElementById("assunto").value;
  const mensagem = document.getElementById("mensagem").value;

  try {
    const response = await fetch("/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emissor, assunto, mensagem })
    });

    const status = document.getElementById("status");
    if (response.ok) {
      status.innerText = "✅ Email enviado com sucesso!";
      status.style.color = "green";
    } else {
      status.innerText = "Erro ao enviar email!";
      status.style.color = "red";
    }
  } catch (err) {
    console.error("Erro:", err);
    document.getElementById("status").innerText = "Erro inesperado!";
  }
});
