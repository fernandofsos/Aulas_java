package curso_array;

import java.util.Locale;
import java.util.Scanner;

public class AulaArray {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Locale.setDefault(Locale.US);
		Scanner sc = new Scanner(System.in);

		int n = sc.nextInt();
		double soma = 0.0;

		double[] vect = new double[n];

		
		for (int i = 0; i < vect.length; i++) {
		
			vect[i] = sc.nextDouble();
			soma += vect[i];
			
		}
		
		System.out.printf("Valor da conta = R$ %.2f%n", soma);
		
		double avg = soma / n;
		System.out.printf("Altura %.2f%n", avg);
		sc.close();

	}

}
