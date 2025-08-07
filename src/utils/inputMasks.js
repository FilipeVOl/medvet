// Função para formatar CPF
export const formatCPF = (cpf) => {
  if (!cpf) return "";
  return cpf.replace(/[^\d]/g, "");
};

export const formatCPFDisplay = (cpf) => {
  if (!cpf) return "";
  const cleaned = cpf.replace(/[^\d]/g, "");
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
};

export const handleCPFChange = (value, setValue) => {
  if (!value) {
    setValue("");
    return;
  }
  const cleaned = value.replace(/[^\d]/g, "");
  if (cleaned.length <= 11) {
    setValue(formatCPFDisplay(cleaned));
  }
};

// Função para formatar telefone
export const formatPhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/[^\d]/g, "");
};

export const formatPhoneDisplay = (phone) => {
  if (!phone) return "";
  const cleaned = phone.replace(/[^\d]/g, "");
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  if (cleaned.length <= 10) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

export const handlePhoneChange = (value, setValue) => {
  if (!value) {
    setValue("");
    return;
  }
  const cleaned = value.replace(/[^\d]/g, "");
  if (cleaned.length <= 11) {
    setValue(formatPhoneDisplay(cleaned));
  }
};

// Função para formatar CEP
export const formatCEP = (cep) => {
  if (!cep) return "";
  return cep.replace(/[^\d]/g, "");
};

export const formatCEPDisplay = (cep) => {
  if (!cep) return "";
  const cleaned = cep.replace(/[^\d]/g, "");
  if (cleaned.length <= 5) return cleaned;
  return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
};

export const handleCEPChange = (value, setValue) => {
  if (!value) {
    setValue("");
    return;
  }
  const cleaned = value.replace(/[^\d]/g, "");
  if (cleaned.length <= 8) {
    setValue(formatCEPDisplay(cleaned));
  }
};
