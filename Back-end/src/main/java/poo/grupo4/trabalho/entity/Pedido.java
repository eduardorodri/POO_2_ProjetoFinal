package poo.grupo4.trabalho.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "pedido")
@Table(name = "pedido")
public class Pedido {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column()
  private int idFuncionario;

  @Column()
  private int idPreco;

  @Column()
  private String dataEmissao;

  @Column()
  private String dataFinalizacao;

  public int getIdFuncionario() {
    return idFuncionario;
  }

  public int getIdPreco() {
    return idPreco;
  }

  public Long getId() {
    return id;
  }

  public String getDataEmissao() {
    return dataEmissao;
  }

  public String getDataFinalizacao() {
    return dataFinalizacao;
  }

  public void setIdFuncionario(int idFuncionario) {
    this.idFuncionario = idFuncionario;
  }

  public void setIdPreco(int idPreco) {
    this.idPreco = idPreco;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setDataFinalizacao(String dataFinalizacao) {
    this.dataFinalizacao = dataFinalizacao;
  }

  public void setDataEmissao(String dataEmissao) {
    this.dataEmissao = dataEmissao;
  }

}
