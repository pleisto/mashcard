# frozen_string_literal: true
class GrpcService
  def self.client
    AntiCorruption::MetadataService::Stub.new('127.0.0.1:3090', :this_channel_is_insecure)
  end

  def self.metadata
    client.get_metadata(Google::Protobuf::Empty.new)
  end
end
