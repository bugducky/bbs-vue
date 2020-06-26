package com.sample;


public class Article {

  private long aId;
  private String aName;
  private String aAuthor;
  private java.sql.Timestamp aTime;
  private String aContent;
  private long aSortid;
  private long aCommentNum;
  private long aLikeNum;
  private long aIsHot;


  public long getAId() {
    return aId;
  }

  public void setAId(long aId) {
    this.aId = aId;
  }


  public String getAName() {
    return aName;
  }

  public void setAName(String aName) {
    this.aName = aName;
  }


  public String getAAuthor() {
    return aAuthor;
  }

  public void setAAuthor(String aAuthor) {
    this.aAuthor = aAuthor;
  }


  public java.sql.Timestamp getATime() {
    return aTime;
  }

  public void setATime(java.sql.Timestamp aTime) {
    this.aTime = aTime;
  }


  public String getAContent() {
    return aContent;
  }

  public void setAContent(String aContent) {
    this.aContent = aContent;
  }


  public long getASortid() {
    return aSortid;
  }

  public void setASortid(long aSortid) {
    this.aSortid = aSortid;
  }


  public long getACommentNum() {
    return aCommentNum;
  }

  public void setACommentNum(long aCommentNum) {
    this.aCommentNum = aCommentNum;
  }


  public long getALikeNum() {
    return aLikeNum;
  }

  public void setALikeNum(long aLikeNum) {
    this.aLikeNum = aLikeNum;
  }


  public long getAIsHot() {
    return aIsHot;
  }

  public void setAIsHot(long aIsHot) {
    this.aIsHot = aIsHot;
  }

}
