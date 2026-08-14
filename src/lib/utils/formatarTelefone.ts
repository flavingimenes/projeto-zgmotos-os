export default function formatarTelefone(phone: string) {
    const numbers = phone.replace(/\D/g, "");

    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    if (numbers.length === 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    if (numbers.length === 8) {
      return numbers.replace(/(\d{4})(\d{4})/, "$1-$2");
    }

    if (numbers.length === 9) {
      return numbers.replace(/(\d{5})(\d{4})/, "$1-$2");
    }

    return phone;
  }