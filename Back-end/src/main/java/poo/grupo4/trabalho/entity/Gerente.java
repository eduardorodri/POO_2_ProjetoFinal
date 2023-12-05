package poo.grupo4.trabalho.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "gerente")
@Table(name = "gerente")
public class Gerente {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column()
  private String nome;

  @Column()
  private String email;

  @Column()
  private String telefone;

  @Column()
  private String setor;

  public String getEmail() {
    return email;
  }

  public Long getId() {
    return id;
  }

  public String getNome() {
    return nome;
  }

  public String getSetor() {
    return setor;
  }

  public String getTelefone() {
    return telefone;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public void setSetor(String setor) {
    this.setor = setor;
  }

  public void setTelefone(String telefone) {
    this.telefone = telefone;
  }
}
