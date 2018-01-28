package com.marco.tlp.models.rpccontrollers;

public class TestExecution {
//	@JsonProperty("id")
	private Integer id;

//	@JsonProperty("testPlanId")
	private Integer testPlanId;

//	@JsonProperty("buildId")
	private Integer buildId;

//	@JsonProperty("version")
	private Integer version;
	
	private String platformName;
	
//	@JsonProperty("notes")
	private String notes;

//	@JsonProperty("executionStatusChar")
	private char executionStatusChar;
	
	public TestExecution() {
		
	}
	
	public TestExecution(Integer id, Integer testPlanId, Integer buildId, Integer version, String notes, char executionStatusChar) {
		super();
		this.id = id;
		this.testPlanId = testPlanId;
		this.buildId = buildId;
		this.version = version;
		this.platformName = null;
		this.notes = notes;
		this.executionStatusChar = executionStatusChar;
	}
	
	public TestExecution(Integer id, Integer testPlanId, Integer buildId, Integer version, String platformId, String notes, char executionStatusChar) {
		super();
		this.id = id;
		this.testPlanId = testPlanId;
		this.buildId = buildId;
		this.version = version;
		this.platformName = platformId;
		this.notes = notes;
		this.executionStatusChar = executionStatusChar;
	}

	public Integer getId() {
		return id;
	}

	public Integer getTestPlanId() {
		return testPlanId;
	}

	public Integer getBuildId() {
		return buildId;
	}
	
	public Integer getVersion() {
		return version;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public char getExecutionStatusChar() {
		return executionStatusChar;
	}

	public void setExecutionStatusChar(char executionStatusChar) {
		this.executionStatusChar = executionStatusChar;
	}

	public String getPlatformName() {
		return platformName;
	}

	@Override
	public String toString() {
		return "TestExecution [id=" + id + ", testPlanId=" + testPlanId + ", buildId=" + buildId + ", version="
				+ version + ", platformId=" + platformName + ", notes=" + notes + ", executionStatusChar="
				+ executionStatusChar + "]";
	}

	
	
	
}
