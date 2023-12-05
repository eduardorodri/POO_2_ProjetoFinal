package poo.grupo4.trabalho.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "preco")
@Table(name = "preco")
public class Preco {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column()
  private int idGerente;

  @Column()
  private String tipoServico;

  @Column()
  private Double preco;

  public String getTipoServico() {
    return tipoServico;
  }

  public Double getPreco() {
    return preco;
  }

  public Long getId() {
    return id;
  }

  public void setTipoServico(String tipoServico) {
    this.tipoServico = tipoServico;
  }

  public int getIdGerente() {
    return idGerente;
  }

  public void setIdGerente(int idGerente) {
    this.idGerente = idGerente;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setPreco(Double preco) {
    this.preco = preco;
  }

}
