package poo.grupo4.trabalho.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "contratado")
@Table(name = "contratado")
public class Contratado {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column()
  private String nome;

  @Column()
  private String telefone;

  @Column()
  private String funcao;

  @Column()
  private Long idGerente;

  public String getFuncao() {
    return funcao;
  }

  public Long getId() {
    return id;
  }

  public String getNome() {
    return nome;
  }

  public String getTelefone() {
    return telefone;
  }

  public void setFuncao(String funcao) {
    this.funcao = funcao;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setTelefone(String telefone) {
    this.telefone = telefone;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public Long getIdGerente() {
    return idGerente;
  }

  public void setIdGerente(Long idGerente) {
    this.idGerente = idGerente;
  }

}
