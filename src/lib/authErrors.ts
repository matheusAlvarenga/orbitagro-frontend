import { FirebaseError } from "firebase/app";

export function getAuthErrorMessage(error: unknown): string {
	if (!(error instanceof FirebaseError))
		return "Erro inesperado. Tente novamente.";
	switch (error.code) {
		case "auth/email-already-in-use":
			return "Este e-mail já está cadastrado.";
		case "auth/invalid-email":
			return "E-mail inválido.";
		case "auth/wrong-password":
		case "auth/invalid-credential":
			return "E-mail ou senha incorretos.";
		case "auth/user-not-found":
			return "Nenhuma conta encontrada com este e-mail.";
		case "auth/weak-password":
			return "A senha deve ter pelo menos 6 caracteres.";
		case "auth/too-many-requests":
			return "Muitas tentativas. Tente novamente em breve.";
		case "auth/network-request-failed":
			return "Erro de rede. Verifique sua conexão.";
		default:
			return "Erro ao autenticar. Tente novamente.";
	}
}
